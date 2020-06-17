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
            monthlyData = [],
            annualData = [],
            catArray = [],
            loanTotal = A,
            containerWidth,
            N10,
            N25,
            I10,
            I25,
            categories,
            tickInterval = 2.
            year = new Date().getFullYear();

        
        // converts the term into months
        if (this.frequency == 1) {
            n = n*12;
        }

        // amortized loan calculations
        DNumerator = (Math.pow((1+r),n))-1;
        DDenominator = r*(Math.pow((1+r), n));
        D = DNumerator/DDenominator;

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

        // get data for chart
        monthlyData.push(A); // adds starting loan amount to the data array

        for (i=0; i<n; i++) {
            loanTotal = loanTotal * r + loanTotal - this.monthlyPayment; // monthly loan total calculated as principal plus interest, minus the payment
            monthlyData.push(loanTotal); 
            annualData = monthlyData.filter((_,i) => i % 12 == 0); // takes every 12th data point
            annualData.pop(); // removes last data point and replaces it with 0
            annualData.push(0);
        }
        console.log(annualData)

        currentDate = new Date();

        for (i=0; i<annualData.length; i++) {
            year = currentDate.getFullYear();
            month = currentDate.getMonth() + 1;
            catYear = i + year; // gets the array of years for the loan

            categories = catYear.toString().substr(-2); // converts years to two digits
            categories = month + '/' + categories; // adds month to year
            catArray.push(categories);
        }
        
        console.log(catArray);

        containerWidth = document.getElementById('calculator').offsetWidth;

        if (containerWidth < 400) {
            setTickIntervalMobile();
        } else {
            setTickIntervalDesktop();
        }

        function setTickIntervalMobile() {
            if (annualData.length > 22) {
                tickInterval = 10;
            } else if (annualData.length >= 14 && annualData.length < 22) {
                tickInterval = 5;
            } else if (annualData.length < 7) {
                tickInterval = 1;
            }
        }

        function setTickIntervalDesktop() {
            if (annualData.length < 12) {
                tickInterval = 1;
            } else if (annualData.length > 21) {
                tickInterval = 5;
            }
        }

        

        this.drawChart(annualData,catArray,tickInterval);


        // add 10% to your payment
        this.tenPayment = this.monthlyPayment*1.1;

        N10 = (Math.log(1-r*A/this.tenPayment)*-1)/Math.log(1+r);

        currentDate = new Date();

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

        fullPayoffDate25 = new Date(currentDate.setMonth(currentDate.getMonth()+N25+1));

        month = monthNames[fullPayoffDate25.getMonth()];
        year = fullPayoffDate25.getFullYear();

        this.twentyfivePayoff = month + " " + year;

        I25 = this.twentyfivePayment*N25 - A;

        this.twentyfiveSave = this.totalInterest - I25;


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


      },
      drawChart: function(annualData,catArray,tickInterval) {

        Highcharts.setOptions({
            lang: {
              thousandsSep: ',',
              numericSymbols: [null, "M", "G", "T", "P", "E"]
            }
        });

        function drawHighcharts() {
            Highcharts.chart('chart-container-loancalc', {
                chart: {
                    type: 'column',
                    styledMode: true,
                    spacingBottom: 0,
                    spacingRight: 20,
                    spacingLeft: 0,
                    animation: false
                }, 
                title: {
                    text: null
                },
                series: [{
                    name: 'Loan balance',
                    data: annualData
                }],
                // for line charts only
                plotOptions: {
                    series: {
                        groupPadding: 0.1
                    }
                },
                legend: {
                    enabled: false
                },
                xAxis: {
                    labels: {
                        style: {
                            textOverflow: 'none'
                        },
                        autoRotation: 0,
                    },
                    categories: catArray,
                    tickLength: 5,
                    tickInterval: tickInterval
                },
                yAxis: {
                    title: false,
                    labels: {
                        overflow: 'allow',
                        formatter: function () {
                            return '$' + Highcharts.numberFormat(this.value,0,'.',',');
                        },
                    },
                    tickAmount: 5,
                },
                credits: {
                    enabled: false
                },
                tooltip: {
                    shadow: false,
                    padding: 10,
                    shared: true,
                    valuePrefix: '$',
                    valueDecimals: 2
                },
            })
        }
        
        if (document.readyState === 'complete' || document.readyState === 'interactive') {
            drawHighcharts();
        } else {
            document.addEventListener("DOMContentLoaded", drawHighcharts);
        }

      }
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