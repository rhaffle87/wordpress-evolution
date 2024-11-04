<?php

 if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly
 }

/**
 * Duitku VA BCA
 *
 * This gateway is used for processing VA BCA online payment
 *
 * Copyright (c) Duitku
 *
 * This script is only free to the use for merchants of Duitku. If
 * you have found this script useful a small recommendation as well as a
 * comment on merchant form would be greatly appreciated.
 *
 * @class       WC_Gateway_Duitku_VA_BCA
 * @extends     Duitku_Payment_Gateway
 * @package     Duitku/Classes/Payment
 * @author      Duitku
 * @located at  /includes/gateways
 */

 class WC_Gateway_Duitku_VA_BCA extends Duitku_Payment_Gateway {
    var $sub_id = 'duitku_va_bca';
        public function __construct() {
	    parent::__construct();
            $this->method_title = 'Duitku VA BCA';
	    $this->payment_method = 'BC';
	    //payment gateway logo
	    $this->icon = plugins_url('/assets/bca.png', dirname(__FILE__) );

	    //load settings
	    $this->init_form_fields();
		$this->init_settings();
	}
 
 
 	function init_form_fields() {
			
		$this->form_fields = array(
			'enabled' => array(
				'title' => __('Enable/Disable', 'wc-duitku'),
				'label' => __('Enable Duitku', 'wc-duitku'),
				'type' => 'checkbox', 'description' => '',
				'default' => 'no',
			),
			'title' => array(
				'title' => __('Title', 'wc-duitku'), 
				'type' => 'text', 
				'description' => __('', 'wc-duitku'),
				'default' => __('Pembayaran Duitku', 'wc-duitku'),
			),
			'description' => array(
				'title' => __('Description', 'wc-duitku'),
				'type' => 'textarea', 
				'description' => __('', 'wc-duitku'), 
				'default' => 'Sistem pembayaran menggunakan Duitku.',
			),
			'duitku_expiry_period' => array(
				'title' => __('Expired Period', 'wc-duitku'),
				'type' => 'number',
				'text', 'description' => __('', 'wc-duitku'),
				'description' => __('Masa berlaku transaksi sebelum kedaluwarsa. example <code>1 - 1440 ( menit )</code>', 'wc-duitku'),
				'default' => __('1440', 'wc-duitku'),
				'custom_attributes' => array(
					'min'       =>  1,
					'max'       =>  1440,
				),
			),
		);
	}
}

?>
