
class HB_Admin {
    constructor({saveBtn, nonce='', partials={}, templates={}}){
        this.templates = templates || {};
        this.partials = partials || {};
        this.helpers = {};
        this.compiledTemplates = {};
        this.compiledPartials = {};
        this.saveBtnSelector = saveBtn;
    }
    bindSave(){
        var that = this;
        jQuery(saveBtn).on('click', function(e){
            e.stopPropagation();
            that.saveData().then((result) => {
                console.log("TEMPLATES SAVED!");
            })
        })
    }
    addPartial(name, txt, options={}){
        this.partials[name] = {content: txt, options};
    }
    addTemplate(name, txt, options={}){
        this.templates[name] = {content: txt, options};
    }
    includePartials(){
        for(let name in this.partials){
            let partial = this.partials[name];
            Handlebars.registerPartial(name, partial.content);
            this.compiledPartials[name] = Handlebars.precompile(partial.content, {partial: true});
        }

    }
    buildTemplates(){
        this.includePartials();
        for(let name in this.templates){
            this.compiledTemplates[name] = Handlebars.precompile(this.templates[name].content, this.templates[name].options);
        }
    }

    debug(){
        for(let name in this.compiledTemplates){
            console.log("TEMPLATE: " + name);
            console.log(this.compiledTemplates[name]);
        }
    }
    toCacheFile(){
        let out = 'const _tmpl = Handlebars.template; Handlebars.templates = Handlebars.templates || {}; Handlebars.partials = Handlebars.partials || {};';
        this.compiledPartials = {};
        this.compiledTemplates = {};
        for(let name in this.compiledPartials){
            let partial = this.compiledPartials[name];
            out += `Handlebars.partials['${name}']= _tmpl(${partial}); `;
        }

        for(let name in this.compiledTemplates){
            out += `Handlebars.templates['${name}']= _tmpl(${this.compiledTemplates[name]}); `;
        }
        out += '';
        return {code: out, partial_names: Object.keys(this.partials), template_names: Object.keys(this.templates)};
    }

    saveData(){
        return new Promise((resolve, reject) => {
            let result = this.toCacheFile();
            let saveUrl = ajaxurl ;
            jQuery.ajax({url: saveUrl, method: 'POST', 'data': {action: 'save_handlebars_templates', security: 13, doc: result}, 'contentType': 'application/json', dataType: 'json'})
                .done((res) => {
                    resolve(res);
            })
        })

    }
}

const adm = new HB_Admin();
adm.addPartial('title', '{{title}}');
adm.addTemplate('main', '<h1>{{name}}</h1><p>{{> title }}</p>')
adm.addTemplate('funny', '<h1>{{name}}</h1><p>{{> title }}</p>')
adm.buildTemplates();


