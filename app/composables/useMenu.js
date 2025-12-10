export default () => {
  return {
    menuMain: [{
      name: 'about',
      to: '/#about'
    },{
      name: 'numbers',
      to: '/#numbers'
    },{
      name: 'cases',
      to: '/#cases'
    },{
      name: 'services',
      to: '/#services'
    },{
      name: 'team',
      to: '/#team'
    },{
      name: 'contact',
      to: '/#contact'
    }],
    menuSecond: [{
      name: 'web_development',
      to: '/#web_development'
    },{
      name: 'lidogenation',
      to: '/#lidogenation'
    },{
      name: 'automation',
      to: '/#automation'
    },{
      name: 'web_design',
      to: '/#web_design'
    },{
      name: 'consulting',
      to: '/#consulting'
    }],
    menuContacts: [{
      name: 'mail',
      contact: 'info@oyster.com',
      to: 'mailto:info@oyster.com',
      icon: 'hugeicons:mail-01',
    },{
      name: 'phone',
      contact: '+7 926 1234567',
      to: 'tel:79261234567',
      icon: 'hugeicons:call-ringing-02'
    }]
  }
}