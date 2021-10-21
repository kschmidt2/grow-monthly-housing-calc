var calculator = new Vue({
    el: '#calculator',
    data: {
      income: '60,000',
      rentbuy:'rent',
      debt: '500',
      monthly25:0,
      monthly30:0,
      monthly28:0,
      monthly36:0,
      canPay:0,
      showRentbuy: 'rent',
      exceedMax: true,
      isDisabled: true,

    },
    watch: {
        income: function(newValue) {
            const result = newValue.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            Vue.nextTick(() => this.income = result);
          },
          debt: function(newValue) {
            const result = newValue.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            Vue.nextTick(() => this.debt = result);
          },
    },
    methods: {
      // functions go here
      getResults: function () {
        let income = parseInt((this.income.replace(/,/g, '')),10),
            debt = parseInt((this.debt.replace(/,/g, '')),10),
            monthlyIncome = income/12,
            totalDebt25,
            totalDebt28;


        if (this.rentbuy == 'rent') {
            this.showRentbuy = 'rent';
        } else if (this.rentbuy == 'buy') {
            this.showRentbuy = 'buy';
        }

        this.monthly25 = monthlyIncome*.25;
        this.monthly28 = monthlyIncome*.28;
        this.monthly30 = monthlyIncome*.30;
        this.monthly36 = monthlyIncome*.36;

        console.log(debt+this.monthly28)
        console.log(debt+this.monthly36)

        if ((debt + this.monthly28) > this.monthly36) {
            this.canPay = this.monthly36 - debt;
            this.exceedMax = true;
        } else if ((debt + this.monthly28) <= this.monthly36) {
            this.canPay = this.monthly28;
            this.exceedMax = false;
        }

        console.log(this.canPay);

        
      


        this.canPay = this.canPay.toLocaleString(undefined,
            {'minimumFractionDigits':0,'maximumFractionDigits':0});
        this.monthly25 = this.monthly25.toLocaleString(undefined,
            {'minimumFractionDigits':0,'maximumFractionDigits':0});
        this.monthly30 = this.monthly30.toLocaleString(undefined,
            {'minimumFractionDigits':0,'maximumFractionDigits':0});
        this.monthly28 = this.monthly28.toLocaleString(undefined,
            {'minimumFractionDigits':0,'maximumFractionDigits':0});

     


      },
      
    },
    mounted: function(){
        this.getResults()
     },
  })

  function limitNumber () {
    if (this.value.length > this.maxLength) {
        this.value = this.value.slice(0, this.maxLength);
        type = "number"
        maxlength = "2"
    }
  }