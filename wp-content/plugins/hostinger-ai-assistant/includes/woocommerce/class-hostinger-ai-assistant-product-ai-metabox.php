<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class Hostinger_Ai_Assistant_Product_Ai_Metabox {
	public function __construct() {
		add_action( 'add_meta_boxes', array( $this, 'add_custom_product_metabox' ) );
		add_action( 'edit_form_after_title', array( $this, 'move_custom_metabox' ) );
	}

	public function move_custom_metabox(): void {
		global $post, $wp_meta_boxes;
		if ( $post && $post->post_type === 'product' ) {
			do_meta_boxes( get_current_screen(), 'advanced', $post );
			unset( $wp_meta_boxes[ get_post_type( $post ) ]['advanced'] );
		}
	}

	public function add_custom_product_metabox(): void {
		add_meta_box(
			'custom_product_metabox',
			__( 'Create product with AI', 'hostinger-ai-assistant' ),
			array( $this, 'render_custom_product_metabox' ),
			'product',
			'advanced',
			'high'
		);
	}

	public function render_custom_product_metabox(): void {
		ob_start();
		?>
		<div class="hts-ai-product-generation">
			<div class="hts-supported-by-hostinger">
				<div class="hts-wrapper">
					<span><?php echo esc_html__( 'Powered by', 'hostinger-ai-assistant' ); ?></span>
					<svg width="101" height="20" viewBox="0 0 101 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd"
						      clip-rule="evenodd"
						      d="M0.000166377 9.36401V0.000331863L4.72611 2.5203V6.73909L10.9823 6.74211L15.7849 9.36401H0.000166377ZM12.2616 5.96706V0L17.115 2.45727V8.78646L12.2616 5.96706ZM12.2616 17.4118V13.2294L5.95718 13.225C5.96307 13.2529 1.07487 10.5612 1.07487 10.5612L17.115 10.6365V20L12.2616 17.4118ZM0 17.4118L0.000168141 11.2928L4.72611 14.0455V19.8689L0 17.4118Z"
						      fill="#673DE6"/>
						<path d="M77.9292 8.02186C78.3181 7.53835 78.9497 7.29659 79.823 7.29659C80.2161 7.29659 80.5786 7.34639 80.9115 7.44631C81.244 7.5464 81.5385 7.66409 81.7953 7.79988L82.3364 6.30141C82.272 6.26151 82.1662 6.20535 82.0177 6.13343C81.8694 6.06134 81.681 5.99143 81.4523 5.9237C81.2238 5.85563 80.9514 5.79578 80.6348 5.74364C80.318 5.69183 79.9634 5.66551 79.5706 5.66551C78.9934 5.66551 78.4503 5.76174 77.9413 5.95371C77.4322 6.1455 76.9895 6.42715 76.6127 6.79884C76.2355 7.17035 75.9393 7.62435 75.723 8.15966C75.5065 8.69531 75.3982 9.31076 75.3982 10.0063C75.3982 10.6937 75.4961 11.3053 75.6928 11.8405C75.8892 12.3759 76.1679 12.8278 76.5283 13.1952C76.8891 13.5631 77.3239 13.8426 77.8332 14.0347C78.342 14.2263 78.9093 14.3224 79.5345 14.3224C80.264 14.3224 80.8774 14.2721 81.3743 14.1723C81.8715 14.0726 82.232 13.9789 82.4566 13.8908V9.77851H80.5806V12.6678C80.4685 12.692 80.3382 12.7079 80.19 12.7158C80.0416 12.7236 79.863 12.7277 79.6547 12.7277C79.2698 12.7277 78.9334 12.6618 78.6448 12.53C78.3561 12.3981 78.1159 12.2121 77.9232 11.9722C77.731 11.7323 77.5867 11.4466 77.4904 11.1152C77.3942 10.7836 77.3463 10.4136 77.3463 10.0063C77.3463 9.16675 77.5405 8.50553 77.9292 8.02186Z"
						      fill="#673DE6"/>
						<path d="M48.1307 12.6737C47.9583 12.718 47.7399 12.7398 47.4754 12.7398C46.9465 12.7398 46.4994 12.6858 46.1348 12.5777C45.7698 12.47 45.4631 12.3483 45.2149 12.2122L44.6856 13.6987C44.7979 13.763 44.9362 13.8307 45.1004 13.9028C45.2649 13.9747 45.4614 14.0426 45.6898 14.1065C45.9183 14.1704 46.1807 14.2242 46.4773 14.2684C46.7739 14.3124 47.1067 14.3345 47.4754 14.3345C48.5736 14.3345 49.3953 14.1206 49.9404 13.6927C50.4855 13.2652 50.7582 12.6637 50.7582 11.8883C50.7582 11.4889 50.7059 11.1494 50.602 10.8695C50.4976 10.5896 50.3392 10.3457 50.127 10.138C49.9145 9.93027 49.6478 9.74837 49.3273 9.59246C49.0065 9.43654 48.6297 9.27878 48.1971 9.11867C47.9884 9.04675 47.7979 8.97701 47.6259 8.90894C47.4534 8.84121 47.3011 8.7651 47.1687 8.68127C47.0366 8.59728 46.9342 8.50339 46.8622 8.39945C46.7901 8.29584 46.7538 8.16775 46.7538 8.01569C46.7538 7.76019 46.8521 7.57024 47.0485 7.44635C47.2449 7.32262 47.5676 7.26025 48.0167 7.26025C48.4174 7.26025 48.76 7.30653 49.0447 7.39823C49.329 7.49027 49.5876 7.59623 49.8203 7.7161L50.3612 6.24144C50.0967 6.09759 49.76 5.96548 49.3514 5.84561C48.9425 5.72591 48.4574 5.66555 47.8963 5.66555C47.4231 5.66555 46.9984 5.7239 46.6216 5.83958C46.2448 5.95576 45.9243 6.12123 45.6598 6.33717C45.3952 6.55327 45.1909 6.8148 45.0465 7.12261C44.9022 7.43025 44.8301 7.77595 44.8301 8.15971C44.8301 8.54346 44.8982 8.86904 45.0345 9.13661C45.1707 9.40469 45.3473 9.63252 45.5635 9.82029C45.7799 10.0082 46.0244 10.1641 46.2969 10.2879C46.5695 10.4116 46.842 10.5217 47.1148 10.6173C47.7399 10.8255 48.1808 11.0192 48.4374 11.1992C48.6938 11.3788 48.8222 11.6049 48.8222 11.8765C48.8222 12.0045 48.8022 12.1205 48.762 12.2243C48.7219 12.3282 48.6496 12.4181 48.5455 12.4937C48.4414 12.5701 48.303 12.63 48.1307 12.6737Z"
						      fill="#673DE6"/>
						<path fill-rule="evenodd"
						      clip-rule="evenodd"
						      d="M42.7584 10.0063C42.7584 10.7174 42.652 11.3431 42.44 11.8823C42.2273 12.422 41.9366 12.8736 41.568 13.2371C41.1993 13.601 40.7602 13.8747 40.2513 14.0584C39.7423 14.2425 39.195 14.3344 38.6101 14.3344C38.0407 14.3344 37.5039 14.2425 36.9988 14.0584C36.4937 13.8747 36.0526 13.601 35.676 13.2371C35.299 12.8736 35.0028 12.422 34.7862 11.8823C34.5698 11.3431 34.4613 10.7174 34.4613 10.0063C34.4613 9.29475 34.5737 8.66924 34.7981 8.1299C35.0224 7.59023 35.3253 7.13657 35.7061 6.76891C36.0866 6.40125 36.5276 6.12563 37.0289 5.94172C37.5296 5.75763 38.0569 5.66559 38.6101 5.66559C39.179 5.66559 39.7161 5.75763 40.2214 5.94172C40.7263 6.12563 41.1671 6.40125 41.544 6.76891C41.9206 7.13657 42.2174 7.59023 42.4338 8.1299C42.6503 8.66924 42.7584 9.29475 42.7584 10.0063ZM36.397 10.0063C36.397 10.4137 36.447 10.7813 36.5472 11.1091C36.6474 11.437 36.7918 11.7187 36.9803 11.9544C37.1683 12.1904 37.399 12.372 37.6717 12.4997C37.9441 12.628 38.2567 12.692 38.6096 12.692C38.9541 12.692 39.2649 12.628 39.5416 12.4997C39.8179 12.372 40.0506 12.1904 40.2387 11.9544C40.427 11.7187 40.5717 11.437 40.6719 11.1091C40.7721 10.7813 40.8222 10.4137 40.8222 10.0063C40.8222 9.59837 40.7721 9.2287 40.6719 8.89691C40.5717 8.5653 40.427 8.2818 40.2387 8.04575C40.0506 7.81003 39.8179 7.62796 39.5416 7.50038C39.2649 7.37246 38.9541 7.30858 38.6096 7.30858C38.2567 7.30858 37.9441 7.37447 37.6717 7.50624C37.399 7.63819 37.1683 7.8221 36.9803 8.05799C36.7918 8.2937 36.6474 8.57737 36.5472 8.90899C36.447 9.24094 36.397 9.60658 36.397 10.0063Z"
						      fill="#673DE6"/>
						<path d="M30.1414 5.85777H32.0174V14.1664H30.1414V10.6415H26.9909V14.1664H25.115V5.85777H26.9909V9.03477H30.1414V5.85777Z"
						      fill="#673DE6"/>
						<path d="M59.0222 5.85785V7.45256H56.509V14.1665H54.6332V7.45256H52.1199V5.85785H59.0222Z"
						      fill="#673DE6"/>
						<path d="M62.9815 14.1667H61.1056V5.85785H62.9815V14.1667Z" fill="#673DE6"/>
						<path d="M71.3787 14.1665C70.8417 13.2154 70.2606 12.2764 69.6351 11.3489C69.0096 10.4217 68.3443 9.54653 67.6391 8.72319V14.1665H65.7872V5.85785H67.3143C67.5786 6.1214 67.8713 6.44514 68.1921 6.82889C68.5128 7.21265 68.8391 7.62239 69.172 8.05795C69.5046 8.49351 69.8354 8.94516 70.1641 9.41257C70.4926 9.88015 70.8013 10.3296 71.09 10.7613V5.85785H72.9539V14.1665H71.3787Z"
						      fill="#673DE6"/>
						<path d="M85.0815 14.1665V5.85785H90.709V7.42841H86.9572V9.05883H90.2881V10.5937H86.9572V12.5959H90.9857V14.1665H85.0815Z"
						      fill="#673DE6"/>
						<path fill-rule="evenodd"
						      clip-rule="evenodd"
						      d="M98.564 6.42715C97.8987 5.98338 96.941 5.76174 95.6903 5.76174C95.3455 5.76174 94.9547 5.77767 94.5179 5.80986C94.0811 5.84155 93.6582 5.89788 93.2494 5.97734V14.1665H95.125V11.1328H96.0512C96.2117 11.3249 96.3728 11.5387 96.5341 11.7747C96.6946 12.0105 96.8582 12.2599 97.0227 12.5238C97.188 12.7877 97.3485 13.0596 97.5056 13.3393C97.6621 13.6191 97.8172 13.8947 97.9702 14.1665H100.067C99.923 13.8628 99.7666 13.5532 99.5984 13.2372C99.4301 12.9216 99.2556 12.618 99.0753 12.3263C98.8949 12.0346 98.7123 11.7548 98.5281 11.4869C98.3438 11.2191 98.1676 10.9814 97.9991 10.7734C98.5042 10.5658 98.8911 10.2798 99.1594 9.91632C99.4281 9.55268 99.5623 9.07873 99.5623 8.49547C99.5623 7.56014 99.2294 6.87076 98.564 6.42715ZM95.4312 7.36835C95.5396 7.36047 95.6615 7.35645 95.7978 7.35645C96.399 7.35645 96.8537 7.44245 97.1623 7.61396C97.471 7.7863 97.6253 8.07567 97.6253 8.4834C97.6253 8.90722 97.4731 9.20715 97.1684 9.38268C96.8639 9.55872 96.3588 9.64623 95.6538 9.64623H95.1246V7.39232C95.2209 7.38461 95.3233 7.37656 95.4312 7.36835Z"
						      fill="#673DE6"/>
					</svg>
				</div>
			</div>
			<form>
				<label class="hts-label"
				       for="hts_product_description"> <?php echo esc_html__( 'Describe your product in short', 'hostinger-ai-assistant' ); ?> </label>
				<textarea id="hts_product_description"
				          name="hts_product_description"
				          value=""></textarea>
				<div class="hts-selections">
					<div class="hts-selection">
						<label class="hts-label"
						       for="product_description_length"> <?php _e( 'Content length', 'hostinger-ai-assistant' ); ?> </label>
						<select id="product_description_length" name="product_description_length">
							<option value="short"><?= esc_html__( 'Short', 'hostinger-ai-assistant' ) ?></option>
							<option value="medium"><?= esc_html__( 'Medium', 'hostinger-ai-assistant' ) ?></option>
							<option value="long"><?= esc_html__( 'Long', 'hostinger-ai-assistant' ) ?></option>
						</select>
					</div>
					<div class="hts-selection">
						<label class="hts-label"
						       for="product_tone_and_mood"> <?php _e( 'Tone of voice', 'hostinger-ai-assistant' ); ?> </label>
						<select id="product_tone_and_mood" name="product_tone_and_mood">
							<option value="neutral"><?= esc_html__( 'Neutral', 'hostinger-ai-assistant' ) ?></option>
							<option value="formal"><?= esc_html__( 'Formal', 'hostinger-ai-assistant' ) ?></option>
							<option value="trustworthy"><?= esc_html__( 'Trustworthy', 'hostinger-ai-assistant' ) ?></option>
							<option value="friendly"><?= esc_html__( 'Friendly', 'hostinger-ai-assistant' ) ?></option>
							<option value="witty"><?= esc_html__( 'Witty', 'hostinger-ai-assistant' ) ?></option>
						</select>
					</div>
				</div>
				<?php wp_nonce_field( 'generate_content', 'generate_content_nonce' ); ?>
				<div class="hts-submit">
					<div class="hts-wrapper">
						<div id="hts-publishing-action">
							<span class="spinner is-active"></span>
						</div>
						<input type="submit" id="hts-woo-product-content-submit"
						       class="button button-primary button-large disabled"
						       value="<?= esc_html__( 'Create product with AI', ' hostinger-ai-assistant' ) ?>">
					</div>
				</div>
			</form>
			<div id="hts-response"></div>
		</div>
		<?php

		echo ob_get_clean();
	}
}

new Hostinger_Ai_Assistant_Product_Ai_Metabox();
