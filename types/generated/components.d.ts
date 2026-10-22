import type { Schema, Struct } from '@strapi/strapi';

export interface BlogArticleListing extends Struct.ComponentSchema {
  collectionName: 'components_blog_article_listing';
  info: {
    displayName: 'Danh s\u00E1ch b\u00E0i vi\u1EBFt';
  };
  attributes: {
    allLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'T\u1EA4T C\u1EA2'>;
    emptyText: Schema.Attribute.String;
    featuredLinkLabel: Schema.Attribute.String;
    featuredSuffix: Schema.Attribute.String;
    readMoreLabel: Schema.Attribute.String;
  };
}

export interface CommerceCart extends Struct.ComponentSchema {
  collectionName: 'components_commerce_cart';
  info: {
    displayName: 'Gi\u1ECF h\u00E0ng';
  };
  attributes: {
    checkoutLabel: Schema.Attribute.String;
    checkoutUrl: Schema.Attribute.String;
    continueLabel: Schema.Attribute.String;
    continueUrl: Schema.Attribute.String;
    emptyButton: Schema.Attribute.Component<'shared.button', false>;
    emptyText: Schema.Attribute.Text;
    emptyTitle: Schema.Attribute.String;
    freeLabel: Schema.Attribute.String;
    freeShippingNote: Schema.Attribute.String;
    productColumnLabel: Schema.Attribute.String;
    shippingLabel: Schema.Attribute.String;
    subtotalLabel: Schema.Attribute.String;
    summaryTitle: Schema.Attribute.String;
    totalColumnLabel: Schema.Attribute.String;
    totalLabel: Schema.Attribute.String;
    unitPriceLabel: Schema.Attribute.String;
  };
}

export interface CommerceCheckout extends Struct.ComponentSchema {
  collectionName: 'components_commerce_checkout';
  info: {
    displayName: 'Thanh to\u00E1n';
  };
  attributes: {
    addressField: Schema.Attribute.Component<'shared.form-field', false>;
    contactTitle: Schema.Attribute.String;
    districtField: Schema.Attribute.Component<'shared.form-field', false>;
    emailField: Schema.Attribute.Component<'shared.form-field', false>;
    emptyButton: Schema.Attribute.Component<'shared.button', false>;
    emptyText: Schema.Attribute.String;
    errorMessage: Schema.Attribute.String;
    nameField: Schema.Attribute.Component<'shared.form-field', false>;
    noteField: Schema.Attribute.Component<'shared.form-field', false>;
    paymentMethods: Schema.Attribute.Component<'commerce.payment-method', true>;
    paymentTitle: Schema.Attribute.String;
    phoneField: Schema.Attribute.Component<'shared.form-field', false>;
    provinceField: Schema.Attribute.Component<'shared.form-field', false>;
    quantityLabel: Schema.Attribute.String;
    shippingLabel: Schema.Attribute.String;
    shippingTitle: Schema.Attribute.String;
    submitLabel: Schema.Attribute.String;
    subtotalLabel: Schema.Attribute.String;
    successUrl: Schema.Attribute.String;
    summaryTitle: Schema.Attribute.String;
    termsNote: Schema.Attribute.Text;
    totalLabel: Schema.Attribute.String;
  };
}

export interface CommerceOrderLookup extends Struct.ComponentSchema {
  collectionName: 'components_commerce_order_lookup';
  info: {
    displayName: 'Tra c\u1EE9u \u0111\u01A1n h\u00E0ng';
  };
  attributes: {
    addressLabel: Schema.Attribute.String;
    cancelledLabel: Schema.Attribute.String;
    carrierLabel: Schema.Attribute.String;
    codeField: Schema.Attribute.Component<'shared.form-field', false>;
    completedLabel: Schema.Attribute.String;
    confirmedLabel: Schema.Attribute.String;
    contactField: Schema.Attribute.Component<'shared.form-field', false>;
    deliveryTitle: Schema.Attribute.String;
    expectedLabel: Schema.Attribute.String;
    itemsTitle: Schema.Attribute.String;
    mobileResultTitle: Schema.Attribute.String;
    notFoundMessage: Schema.Attribute.String;
    paymentLabel: Schema.Attribute.String;
    placedLabel: Schema.Attribute.String;
    quantityLabel: Schema.Attribute.String;
    recipientLabel: Schema.Attribute.String;
    resultTitle: Schema.Attribute.String;
    shippingLabel: Schema.Attribute.String;
    submitLabel: Schema.Attribute.String;
    totalLabel: Schema.Attribute.String;
  };
}

export interface CommerceOrderSuccess extends Struct.ComponentSchema {
  collectionName: 'components_commerce_order_success';
  info: {
    displayName: '\u0110\u1EB7t h\u00E0ng th\u00E0nh c\u00F4ng';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'shared.button', true>;
    description: Schema.Attribute.Text;
    emailLabel: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    icon: Schema.Attribute.Media<'images'>;
    mobileDescription: Schema.Attribute.Text;
    mobileOrderCodeLabel: Schema.Attribute.String;
    orderCodeLabel: Schema.Attribute.String;
    paymentLabel: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    totalLabel: Schema.Attribute.String;
  };
}

export interface CommercePaymentMethod extends Struct.ComponentSchema {
  collectionName: 'components_commerce_payment_method';
  info: {
    displayName: 'Ph\u01B0\u01A1ng th\u1EE9c thanh to\u00E1n';
  };
  attributes: {
    code: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.String;
    hideDescriptionOnMobile: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    mobileTitle: Schema.Attribute.String;
    shortTitle: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommerceSearchResults extends Struct.ComponentSchema {
  collectionName: 'components_commerce_search_results';
  info: {
    displayName: 'K\u1EBFt qu\u1EA3 t\u00ECm ki\u1EBFm';
  };
  attributes: {
    allLabel: Schema.Attribute.String;
    articlesHeading: Schema.Attribute.String;
    articlesLabel: Schema.Attribute.String;
    countTemplate: Schema.Attribute.String;
    emptyTitle: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    image: Schema.Attribute.Component<'shared.image', false>;
    mobileTitleTemplate: Schema.Attribute.String;
    noResultsText: Schema.Attribute.Text;
    placeholder: Schema.Attribute.String;
    productsHeading: Schema.Attribute.String;
    productsLabel: Schema.Attribute.String;
    readMoreLabel: Schema.Attribute.String;
    titleTemplate: Schema.Attribute.String;
  };
}

export interface CommerceStatusEvent extends Struct.ComponentSchema {
  collectionName: 'components_commerce_status_event';
  info: {
    displayName: 'M\u1ED1c tr\u1EA1ng th\u00E1i';
  };
  attributes: {
    at: Schema.Attribute.DateTime;
    note: Schema.Attribute.String;
    status: Schema.Attribute.Enumeration<
      ['pending', 'confirmed', 'shipping', 'completed', 'cancelled']
    > &
      Schema.Attribute.DefaultTo<'pending'>;
  };
}

export interface ContactContactPanel extends Struct.ComponentSchema {
  collectionName: 'components_contact_contact_panel';
  info: {
    displayName: 'Li\u00EAn h\u1EC7 + bi\u1EC3u m\u1EABu';
  };
  attributes: {
    emailField: Schema.Attribute.Component<'shared.form-field', false>;
    errorMessage: Schema.Attribute.String;
    formTitle: Schema.Attribute.String & Schema.Attribute.Required;
    infoTitle: Schema.Attribute.String & Schema.Attribute.Required;
    items: Schema.Attribute.Component<'shared.contact-item', true>;
    messageField: Schema.Attribute.Component<'shared.form-field', false>;
    nameField: Schema.Attribute.Component<'shared.form-field', false>;
    phoneField: Schema.Attribute.Component<'shared.form-field', false>;
    showSocials: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    submitLabel: Schema.Attribute.String & Schema.Attribute.Required;
    successMessage: Schema.Attribute.String;
    topicField: Schema.Attribute.Component<'shared.form-field', false>;
    topics: Schema.Attribute.Component<'shared.option', true>;
  };
}

export interface HomeFeaturedProducts extends Struct.ComponentSchema {
  collectionName: 'components_home_featured_products';
  info: {
    displayName: 'S\u1EA3n ph\u1EA9m n\u1ED5i b\u1EADt';
  };
  attributes: {
    cardLinkLabel: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    mobileDescription: Schema.Attribute.Text;
    mobileSeeAllLabel: Schema.Attribute.String;
    products: Schema.Attribute.Relation<'oneToMany', 'api::product.product'>;
    seeAllLabel: Schema.Attribute.String;
    seeAllUrl: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeHeroSlider extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_slider';
  info: {
    displayName: 'Banner tr\u00ECnh chi\u1EBFu';
  };
  attributes: {
    autoplaySeconds: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 30;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3>;
    nextLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Slide ti\u1EBFp theo'>;
    prevLabel: Schema.Attribute.String &
      Schema.Attribute.DefaultTo<'Slide tr\u01B0\u1EDBc'>;
    slides: Schema.Attribute.Component<'home.slide', true>;
  };
}

export interface HomePhilosophy extends Struct.ComponentSchema {
  collectionName: 'components_home_philosophy';
  info: {
    displayName: 'Tri\u1EBFt l\u00FD th\u01B0\u01A1ng hi\u1EC7u';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    mobileEyebrow: Schema.Attribute.String;
    mobileStatement: Schema.Attribute.Text;
    pillars: Schema.Attribute.Component<'shared.numbered-item', true>;
    statement: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface HomeProcess extends Struct.ComponentSchema {
  collectionName: 'components_home_process';
  info: {
    displayName: 'Quy tr\u00ECnh (T\u1EEB l\u00E1 \u0111\u1EBFn t\u00E1ch)';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    mobileDescription: Schema.Attribute.Text;
    stages: Schema.Attribute.Component<'home.stage', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomeSlide extends Struct.ComponentSchema {
  collectionName: 'components_home_slide';
  info: {
    displayName: 'Slide';
  };
  attributes: {
    ctaLabel: Schema.Attribute.String;
    ctaUrl: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    image: Schema.Attribute.Component<'shared.image', false>;
    mobileDescription: Schema.Attribute.Text;
    mobileTitle: Schema.Attribute.Text;
    title: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface HomeStage extends Struct.ComponentSchema {
  collectionName: 'components_home_stage';
  info: {
    displayName: 'Giai \u0111o\u1EA1n';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Component<'shared.image', false>;
    label: Schema.Attribute.String;
    mobileDescription: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductBrewGuides extends Struct.ComponentSchema {
  collectionName: 'components_product_brew_guides';
  info: {
    displayName: 'H\u01B0\u1EDBng d\u1EABn th\u01B0\u1EDFng tr\u00E0';
  };
  attributes: {
    guides: Schema.Attribute.Component<'shared.text-card', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductKeyMessage extends Struct.ComponentSchema {
  collectionName: 'components_product_key_message';
  info: {
    displayName: 'Th\u00F4ng \u0111i\u1EC7p ch\u00EDnh';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.icon-text', true>;
    note: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProductUsageSteps extends Struct.ComponentSchema {
  collectionName: 'components_product_usage_steps';
  info: {
    displayName: 'C\u00E1c b\u01B0\u1EDBc s\u1EED d\u1EE5ng';
  };
  attributes: {
    eyebrow: Schema.Attribute.String;
    steps: Schema.Attribute.Component<'shared.numbered-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsCardGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_card_grid';
  info: {
    displayName: 'L\u01B0\u1EDBi th\u1EBB';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    cards: Schema.Attribute.Component<'shared.text-card', true>;
    eyebrow: Schema.Attribute.String;
    mobileTitle: Schema.Attribute.String;
    theme: Schema.Attribute.Enumeration<['light', 'white']> &
      Schema.Attribute.DefaultTo<'light'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsCtaBand extends Struct.ComponentSchema {
  collectionName: 'components_sections_cta_band';
  info: {
    displayName: 'K\u00EAu g\u1ECDi h\u00E0nh \u0111\u1ED9ng';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    buttons: Schema.Attribute.Component<'shared.button', true>;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    mobileDescription: Schema.Attribute.Text;
    theme: Schema.Attribute.Enumeration<['navy', 'white']> &
      Schema.Attribute.DefaultTo<'navy'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsFaq extends Struct.ComponentSchema {
  collectionName: 'components_sections_faq';
  info: {
    displayName: 'C\u00E2u h\u1ECFi th\u01B0\u1EDDng g\u1EB7p';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    items: Schema.Attribute.Component<'shared.faq-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsImageBand extends Struct.ComponentSchema {
  collectionName: 'components_sections_image_band';
  info: {
    displayName: '\u1EA2nh to\u00E0n kh\u1ED5';
  };
  attributes: {
    image: Schema.Attribute.Component<'shared.image', false>;
  };
}

export interface SectionsNewsletter extends Struct.ComponentSchema {
  collectionName: 'components_sections_newsletter';
  info: {
    displayName: '\u0110\u0103ng k\u00FD nh\u1EADn tin';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    buttonLabel: Schema.Attribute.String & Schema.Attribute.Required;
    description: Schema.Attribute.Text;
    emailPlaceholder: Schema.Attribute.String;
    errorMessage: Schema.Attribute.String;
    eyebrow: Schema.Attribute.String;
    successMessage: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsPageBanner extends Struct.ComponentSchema {
  collectionName: 'components_sections_page_banner';
  info: {
    displayName: 'Banner trang';
  };
  attributes: {
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    hideDescriptionOnMobile: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<false>;
    image: Schema.Attribute.Component<'shared.image', false>;
    mobileDescription: Schema.Attribute.Text;
    mobileTitle: Schema.Attribute.String;
    size: Schema.Attribute.Enumeration<['default', 'large']> &
      Schema.Attribute.DefaultTo<'default'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SectionsQuoteBand extends Struct.ComponentSchema {
  collectionName: 'components_sections_quote_band';
  info: {
    displayName: 'Tr\u00EDch d\u1EABn';
  };
  attributes: {
    author: Schema.Attribute.String;
    mobileQuote: Schema.Attribute.Text;
    quote: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface SectionsSplitStory extends Struct.ComponentSchema {
  collectionName: 'components_sections_split_story';
  info: {
    displayName: 'Kh\u1ED1i \u1EA3nh + n\u1ED9i dung';
  };
  attributes: {
    anchorId: Schema.Attribute.String;
    body: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    image: Schema.Attribute.Component<'shared.image', false>;
    imagePosition: Schema.Attribute.Enumeration<['left', 'right']> &
      Schema.Attribute.DefaultTo<'right'>;
    layout: Schema.Attribute.Enumeration<['inset', 'full-bleed']> &
      Schema.Attribute.DefaultTo<'inset'>;
    link: Schema.Attribute.Component<'shared.link', false>;
    mobileBody: Schema.Attribute.Text;
    mobileTitle: Schema.Attribute.String;
    showEyebrowLine: Schema.Attribute.Boolean &
      Schema.Attribute.DefaultTo<true>;
    theme: Schema.Attribute.Enumeration<['cream', 'white', 'navy']> &
      Schema.Attribute.DefaultTo<'white'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    titleSize: Schema.Attribute.Enumeration<['medium', 'large']> &
      Schema.Attribute.DefaultTo<'medium'>;
  };
}

export interface SharedButton extends Struct.ComponentSchema {
  collectionName: 'components_shared_button';
  info: {
    displayName: 'N\u00FAt b\u1EA5m';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['primary', 'secondary', 'ghost', 'light', 'outline-light']
    > &
      Schema.Attribute.DefaultTo<'primary'>;
  };
}

export interface SharedContactItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_contact_item';
  info: {
    displayName: 'Th\u00F4ng tin li\u00EAn h\u1EC7';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_faq_item';
  info: {
    displayName: 'C\u00E2u h\u1ECFi';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    closeOnMobile: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    hideOnMobile: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    mobileAnswer: Schema.Attribute.Text;
    openByDefault: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedFormField extends Struct.ComponentSchema {
  collectionName: 'components_shared_form_field';
  info: {
    displayName: 'Tr\u01B0\u1EDDng bi\u1EC3u m\u1EABu';
  };
  attributes: {
    hideOnMobile: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    mobileLabel: Schema.Attribute.String;
    mobilePlaceholder: Schema.Attribute.String;
    placeholder: Schema.Attribute.String;
  };
}

export interface SharedIconText extends Struct.ComponentSchema {
  collectionName: 'components_shared_icon_text';
  info: {
    displayName: 'Icon + ch\u1EEF';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    mobileLabel: Schema.Attribute.String;
  };
}

export interface SharedImage extends Struct.ComponentSchema {
  collectionName: 'components_shared_image';
  info: {
    displayName: 'H\u00ECnh \u1EA3nh';
  };
  attributes: {
    alt: Schema.Attribute.String;
    media: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_link';
  info: {
    displayName: 'Li\u00EAn k\u1EBFt';
  };
  attributes: {
    hideOnMobile: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    mobileLabel: Schema.Attribute.String;
    openInNewTab: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedNavGroup extends Struct.ComponentSchema {
  collectionName: 'components_shared_nav_group';
  info: {
    displayName: 'Nh\u00F3m li\u00EAn k\u1EBFt';
  };
  attributes: {
    links: Schema.Attribute.Component<'shared.link', true>;
    title: Schema.Attribute.String;
  };
}

export interface SharedNumberedItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_numbered_item';
  info: {
    displayName: 'M\u1EE5c \u0111\u00E1nh s\u1ED1';
  };
  attributes: {
    description: Schema.Attribute.Text;
    mobileDescription: Schema.Attribute.Text;
    number: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedOption extends Struct.ComponentSchema {
  collectionName: 'components_shared_option';
  info: {
    displayName: 'L\u1EF1a ch\u1ECDn';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    value: Schema.Attribute.String;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seo';
  info: {
    displayName: 'T\u1ED1i \u01B0u t\u00ECm ki\u1EBFm (SEO)';
  };
  attributes: {
    canonicalUrl: Schema.Attribute.String;
    keywords: Schema.Attribute.String;
    metaDescription: Schema.Attribute.Text &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 320;
      }>;
    metaTitle: Schema.Attribute.String &
      Schema.Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
    noIndex: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_shared_social_link';
  info: {
    displayName: 'M\u1EA1ng x\u00E3 h\u1ED9i';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    platform: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSpecRow extends Struct.ComponentSchema {
  collectionName: 'components_shared_spec_row';
  info: {
    displayName: 'D\u00F2ng th\u00F4ng s\u1ED1';
  };
  attributes: {
    hideOnMobile: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    mobileLabel: Schema.Attribute.String;
    mobileValue: Schema.Attribute.String;
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTag extends Struct.ComponentSchema {
  collectionName: 'components_shared_tag';
  info: {
    displayName: 'Th\u1EBB';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedTextCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_text_card';
  info: {
    displayName: 'Th\u1EBB n\u1ED9i dung';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    mobileDescription: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ShopBannerSlider extends Struct.ComponentSchema {
  collectionName: 'components_shop_banner_slider';
  info: {
    displayName: 'Banner \u1EA3nh tr\u00ECnh chi\u1EBFu';
  };
  attributes: {
    images: Schema.Attribute.Component<'shared.image', true>;
    slideSeconds: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 30;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<3.5>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ShopFilter extends Struct.ComponentSchema {
  collectionName: 'components_shop_filter';
  info: {
    displayName: 'B\u1ED9 l\u1ECDc';
  };
  attributes: {
    kind: Schema.Attribute.Enumeration<['all', 'category', 'brew']> &
      Schema.Attribute.DefaultTo<'all'>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
    slug: Schema.Attribute.String;
  };
}

export interface ShopProductGrid extends Struct.ComponentSchema {
  collectionName: 'components_shop_product_grid';
  info: {
    displayName: 'L\u01B0\u1EDBi s\u1EA3n ph\u1EA9m';
  };
  attributes: {
    emptyText: Schema.Attribute.String;
    filters: Schema.Attribute.Component<'shop.filter', true>;
  };
}

export interface SystemNotFound extends Struct.ComponentSchema {
  collectionName: 'components_system_not_found';
  info: {
    displayName: 'Kh\u00F4ng t\u00ECm th\u1EA5y trang';
  };
  attributes: {
    buttons: Schema.Attribute.Component<'shared.button', true>;
    code: Schema.Attribute.String & Schema.Attribute.DefaultTo<'404'>;
    description: Schema.Attribute.Text;
    eyebrow: Schema.Attribute.String;
    mobileDescription: Schema.Attribute.Text;
    suggestions: Schema.Attribute.Component<'shared.link', true>;
    suggestionsLabel: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export namespace Public {
    export interface ComponentSchemas {
      'blog.article-listing': BlogArticleListing;
      'commerce.cart': CommerceCart;
      'commerce.checkout': CommerceCheckout;
      'commerce.order-lookup': CommerceOrderLookup;
      'commerce.order-success': CommerceOrderSuccess;
      'commerce.payment-method': CommercePaymentMethod;
      'commerce.search-results': CommerceSearchResults;
      'commerce.status-event': CommerceStatusEvent;
      'contact.contact-panel': ContactContactPanel;
      'home.featured-products': HomeFeaturedProducts;
      'home.hero-slider': HomeHeroSlider;
      'home.philosophy': HomePhilosophy;
      'home.process': HomeProcess;
      'home.slide': HomeSlide;
      'home.stage': HomeStage;
      'product.brew-guides': ProductBrewGuides;
      'product.key-message': ProductKeyMessage;
      'product.usage-steps': ProductUsageSteps;
      'sections.card-grid': SectionsCardGrid;
      'sections.cta-band': SectionsCtaBand;
      'sections.faq': SectionsFaq;
      'sections.image-band': SectionsImageBand;
      'sections.newsletter': SectionsNewsletter;
      'sections.page-banner': SectionsPageBanner;
      'sections.quote-band': SectionsQuoteBand;
      'sections.split-story': SectionsSplitStory;
      'shared.button': SharedButton;
      'shared.contact-item': SharedContactItem;
      'shared.faq-item': SharedFaqItem;
      'shared.form-field': SharedFormField;
      'shared.icon-text': SharedIconText;
      'shared.image': SharedImage;
      'shared.link': SharedLink;
      'shared.nav-group': SharedNavGroup;
      'shared.numbered-item': SharedNumberedItem;
      'shared.option': SharedOption;
      'shared.seo': SharedSeo;
      'shared.social-link': SharedSocialLink;
      'shared.spec-row': SharedSpecRow;
      'shared.tag': SharedTag;
      'shared.text-card': SharedTextCard;
      'shop.banner-slider': ShopBannerSlider;
      'shop.filter': ShopFilter;
      'shop.product-grid': ShopProductGrid;
      'system.not-found': SystemNotFound;
    }
  }
}
