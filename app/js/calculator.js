var calculator = new Vue({
    el: '#calculator',
    data: {
      amount: '10,000',
      frequency:1,
      term: 7,
      interestRate: 3,
      totalPaid: '',
      totalInterest: '',
      monthlyPayment: '',
      payoffDate: '',
      tenPayment: '',
      tenSave: '',
      tenPayoff: '',
      twentyfivePayment: '',
      twentyfiveSave: '',
      twentyfivePayoff: '',

    },
    watch: {
        amount: function(newValue) {
            const result = newValue.replace(/\D/g, "")
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            Vue.nextTick(() => this.amount = result);
          },
    },
    methods: {
      // functions go here
      getResults: function () {
        let A = parseInt((this.amount.replace(/,/g, '')),10),
            r = (this.interestRate/100)/12,
            n = this.term,
            DNumerator,
            DDenominator,
            D,
            currentDate,
            fullPayoffDate,
            month,
            year,
            N10,
            N25,
            I10,
            I25,
            PMT,
            fvOfPrincipal = A,
            fvOfContributions = 0,
            totalPrincipal,
            totalInterest,
            combined,
            iData = [],
            rData = [],
            categories,
            catArray = [],
            tickInterval = 5.
            year = new Date().getFullYear();

        
        // converts the term into months
        if (this.frequency == 1) {
            n = n*12;
        }

        // amortized loan calculations
        DNumerator = (Math.pow((1+r),n))-1;
        DDenominator = r*(Math.pow((1+r), n));
        D = DNumerator/DDenominator;
        console.log(D);

        this.monthlyPayment = A/D;

        this.totalPaid = this.monthlyPayment*n;

        this.totalInterest = this.totalPaid - A;

        // get current date and payoff date
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
            ];

        currentDate = new Date();

        fullPayoffDate = new Date(currentDate.setMonth(currentDate.getMonth()+n));

        month = monthNames[fullPayoffDate.getMonth()];
        year = fullPayoffDate.getFullYear();

        this.payoffDate = month + " " + year;

        // add 10% to your payment
        this.tenPayment = this.monthlyPayment*1.1;

        N10 = (Math.log(1-r*A/this.tenPayment)*-1)/Math.log(1+r);

        currentDate = new Date();

        console.log(currentDate);

        fullPayoffDate10 = new Date(currentDate.setMonth(currentDate.getMonth()+N10+1));

        month = monthNames[fullPayoffDate10.getMonth()];
        year = fullPayoffDate10.getFullYear();

        this.tenPayoff = month + " " + year;

        I10 = this.tenPayment*N10 - A;

        this.tenSave = this.totalInterest - I10;


        // add 25% to your payment
        this.twentyfivePayment = this.monthlyPayment*1.25;
        N25 = (Math.log(1-r*A/this.twentyfivePayment)*-1)/Math.log(1+r);

        currentDate = new Date();

        console.log(currentDate);

        fullPayoffDate25 = new Date(currentDate.setMonth(currentDate.getMonth()+N25+1));

        month = monthNames[fullPayoffDate25.getMonth()];
        year = fullPayoffDate25.getFullYear();

        console.log(N25);
        console.log(fullPayoffDate25);

        this.twentyfivePayoff = month + " " + year;

        I25 = this.twentyfivePayment*N25 - A;

        this.twentyfiveSave = this.totalInterest - I25;

        console.log(I25);


        this.monthlyPayment = this.monthlyPayment.toLocaleString(undefined,
            {'minimumFractionDigits':2,'maximumFractionDigits':2});

        this.totalPaid = this.totalPaid.toLocaleString(undefined,
            {'minimumFractionDigits':2,'maximumFractionDigits':2});

        this.totalInterest = this.totalInterest.toLocaleString(undefined,
            {'minimumFractionDigits':2,'maximumFractionDigits':2});

        this.tenPayment = this.tenPayment.toLocaleString(undefined,
            {'minimumFractionDigits':2,'maximumFractionDigits':2});

        this.tenSave = this.tenSave.toLocaleString(undefined,
            {'minimumFractionDigits':2,'maximumFractionDigits':2});

        this.twentyfivePayment = this.twentyfivePayment.toLocaleString(undefined,
            {'minimumFractionDigits':2,'maximumFractionDigits':2});

        this.twentyfiveSave = this.twentyfiveSave.toLocaleString(undefined,
            {'minimumFractionDigits':2,'maximumFractionDigits':2});



        // for (i=0; i<(n/12); i++) {
        //     fvOfPrincipal = fvOfPrincipal*(1+r/n);
        //     fvOfContributions = (fvOfContributions+PMT)*(1+r/n);
        //     combined = fvOfPrincipal + fvOfContributions;
        //     totalInvestment = PMT*(i+1) + A;
        //     totalReturn = Math.round(combined - totalInvestment);
        //     iData.push(totalInvestment);
        //     rData.push(totalReturn);

        //     categories = i + 1 + (year-2000);
        //     categories.toString();
        //     categories = "'" + categories;
        //     catArray.push(categories)
        // }

        // iData.unshift(A);
        // rData.unshift(0);
        // catArray.unshift(year);

        // if (n==12) {  
        //     iData = iData.filter((element, index) => {
        //         return index % 12 === 0;
        //     })
        //     rData = rData.filter((element, index) => {
        //         return index % 12 === 0;
        //     })
        // }

        // if (iData.length > 21) {
        //     tickInterval = 10;
        // } else if (iData.length < 6) {
        //     tickInterval = 1;
        // }

        // this.drawChart(iData,rData,catArray,tickInterval);

        // this.monthlyPayment = fvOfPrincipal + fvOfContributions;

        // totalReturn = this.monthlyPayment - totalContributions;

        // if (this.monthlyPayment > 999999999) {
        //     const suffixes = ["", " billion"," trillion"];
        //     let suffixNum = 0;
        //     this.monthlyPayment /= 999999999;
        //     suffixNum++;
        
        //     this.monthlyPayment = this.monthlyPayment.toPrecision(3);
        
        //     this.monthlyPayment += suffixes[suffixNum];
        // }



      },
    //   drawChart: function(iData,rData,catArray,tickInterval) {

    //     Highcharts.setOptions({
    //         lang: {
    //           thousandsSep: ',',
    //           numericSymbols: [null, "M", "G", "T", "P", "E"]
    //         }
    //     });

    //     function drawHighcharts() {
    //         Highcharts.chart('chart-container-CIcalc', {
    //             chart: {
    //                 type: 'column',
    //                 styledMode: true,
    //                 spacingBottom: 0,
    //                 spacingRight: 20,
    //                 spacingLeft: 20,
    //                 animation: false
    //             }, 
    //             title: {
    //                 text: null
    //             },
    //             series: [{
    //                 name: 'Return',
    //                 data: rData
    //             }, {
    //                 name: 'Investment',
    //                 data: iData
    //             }],
    //             // for line charts only
    //             plotOptions: {
    //                 column: {
    //                     stacking: 'normal'
    //                 },
    //                 series: {
    //                     groupPadding: 0.1
    //                 }
    //             },
    //             legend: {
    //                 align: 'left',
    //                 symbolRadius: 0,
    //                 verticalAlign: 'top',
    //                 x: -18,
    //                 itemMarginTop: -10,
    //             },
    //             xAxis: {
    //                 labels: {
    //                     style: {
    //                         whiteSpace: 'nowrap',
    //                     },
    //                 },
    //                 categories: catArray,
    //                 tickLength: 5,
    //                 tickInterval: tickInterval
    //             },
    //             yAxis: {
    //                 title: false,
    //                 labels: {
    //                     overflow: 'allow',
    //                     formatter: function () {
    //                         return '$' + Highcharts.numberFormat(this.value,0,'.',',');
    //                     },
    //                 },
    //                 tickAmount: 5,
    //             },
    //             credits: {
    //                 enabled: false
    //             },
    //             tooltip: {
    //                 shadow: false,
    //                 padding: 10,
    //                 shared: true,
    //                 valuePrefix: '$'
    //             },
    //         })
    //     }
        
    //     if (document.readyState === 'complete' || document.readyState === 'interactive') {
    //         drawHighcharts();
    //     } else {
    //         document.addEventListener("DOMContentLoaded", drawHighcharts);
    //     }

    //   }
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