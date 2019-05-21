<?php
/**
 * Created by PhpStorm.
 * User: edahood
 * Date: 5/21/19
 * Time: 2:49 AM
 */
namespace HBE\Admin;

class AdminInit{
    public static $instance;

    public function __construct(){
        add_action( 'admin_menu', array($this, 'wpdocs_register_hbs_menu_page') );
    }
    public static function init(){
        if(!self::$instance){
            self::$instance = new AdminInit();
        }
        return self::$instance;
    }
    public function wpdocs_register_hbs_menu_page(){
        add_menu_page(
            __( 'Handlebars', 'hbs' ),
            'custom menu',
            'manage_options',
            'custompage',
            array($this, 'hb_custom_menu_page'),
            plugins_url( 'wp-handlebars-engine/assets/images/mustache.png' ),
            6
        );
    }
    /**
     * Display a custom menu page
     */
    public function hb_custom_menu_page(){
        esc_html_e( 'Handlebars Test Page', 'hbs' );
    }
}

AdminInit::init();