class Question {
    constructor(category, title, answer, display = false) {
        this.category = category;
        this.title = title;
        this.answer = answer;
        this.display = display
    }
}

var app = new Vue({
    el: '#app',
    methods: {

        updateTopic: function (topic) {
            this.selectedCategory = topic
            this.search = ''
        },

        contains: function (target, pattern){
            var value = 0;
            var len = pattern.length
            pattern.forEach(function(word){
              value = value + target.includes(word);
            });
            return (value === len) ? true: false
        },

        updateNav(state){
            this.showMobileNavigation = state
        },

        resetSelection: function(){
            this.question_list.forEach(function(ques){
                if(ques.display){
                    ques.display = false
                }
            })
        }
    },

    computed: {

        filtered_ques() {
            this.showMobileNavigation = false
            if (this.search == '') {
                if (this.search_switch == true) {
                    this.selectedCategory = "Popular FAQ"
                    this.search_switch = false
                }
                return this.question_list.filter(post => {
                    return post.category.toLowerCase().includes(this.selectedCategory.toLowerCase())
                })
            }
            else {
                this.selectedCategory = "Search"
                this.search_switch = true
                return this.question_list.filter(post => {
                    return (this.contains(post.title.toLowerCase(), this.search.toLowerCase().split(' ')) || this.contains(post.answer.toLowerCase(), this.search.toLowerCase().split(' ')))
                })
            }
        },

        displayNull() {
            try {
                this.filtered_ques[0].title
                return false
            }
            catch{
                return true
            }
        }
    },
    data: {

        selectedCategory: 'Popular FAQ',
        search: '',
        search_switch: false,
        showMobileNavigation: false,

        categories: [
            'Popular FAQ',
            'Coins',
            'Account',
            'PayPal',
            'Surveys',
            'Security (?)'
        ],

        question_list: [
            
            new Question(
            
               `Popular FAQ`,
               `Can anyone become a member of Survey Honey?`,
               `Survey Honey may be used only by persons who are 18 years of age or older within the United States and its associated territories.`
              
               ),
             
            new Question(
            
                    `Popular FAQ`,
                    `Why was I invited to an expired or closed survey?`,
                    `Surveys can fill up quickly. You may sometimes receive a 'quota full' or 'this link has expired' response from the survey. <br> Don't worry, there are a plethora of other surveys for you to participate in!`

                    ),

            new Question(
            
                    `Popular FAQ`,
                    `How do I get paid?`,
                    `In order to redeem a cashout via PayPal, you must meet the following criteria:
            <br>-be located within the United States and confirm your location via two-factor authentication using a mobile phone.
            <br>-have a PayPal verified account and
            <br>-accrue a balance of equal to or greater than $12.50 USD.`

                    ),

            new Question(
            
                    `Popular FAQ`,
                    `What's the minimum amount that I can cash out and how quickly will my payment process?`,
                    `SurveyHoney offers two repayment models - the traditional model, in which payment is issued within two weeks of the original cash out request, and the expedited model, in which payment is issued within 48 hours of the original cash out request minus 20% of the payout’s total. You must accrue a balance of $12.50 USD to cash out.`

                    ),

            new Question(
            
                    `Coins`,
                    `How much can I earn answering surveys?`,
                    `While you won't become a millionaire by answering surveys, you can continue to earn rewards earch day by supplying your feedback to researchers through our survey platform.`

                    ),

            new Question(
            
                    `Popular FAQ`,
                    `How often will I receive surveys?`,
                    `If you're subscribed to Survey Honey's emails, we'll let you know about new survey opportunities every few days! You also don't have to wait to hear from us. At any time you can log in and view all available surveys in your dashboard.`

                    ),

            new Question(
            
                    `Surveys`,
                    `Why do surveys ask the same question more than once?`,
                    `Sometimes researchers need to ask the same or similar questions multiple times in a survey because they're measuring specific metrics and looking for continuity in responses. <br> Answering honestly and consistently is the best way to handle these questions.`

                    ),

            new Question(
            
                    `Surveys`,
                    `How much time does it take to complete a survey?`,
                    `Survey times can vary. We recommend planning for each survey to take 10-15 minutes, though the estimated time to complete will be listed before you enter the survey.`

                    ),

            new Question(
            
                    `Surveys`,
                    `How difficult are the surveys to complete?`,
                    `To be a successful panelist on SurveyHoney you just need to be able to read and write English proficiently. <br> The most important piece to being a good survey participant is always providing your honest opinions and feedback.`

                    ),

            new Question(
            
                    `Surveys`,
                    `There was a difference between the estimated time to complete a survey and the amount of time I spent in a survey. Why?`,
                    `The estimated time to complete a survey is determined by the median amount of time spent by participants such as yourself. Some surveys route participants to different survey questions depending on your response choices, so you may be on a shorter or longer path to complete the survey.`

                    ),

            new Question(
            
                    `Surveys`,
                    `What's the average qualification rate for surveys?`,
                    `The average qualification rate for surveys is approximately 20%.`

                    ),

            new Question(
            
                    `Security (?)`,
                    `Why was my account blocked?`,
                    `We ask our survey participants adhere to a Code of Conduct in order to use Survey Honey. Speeding through surveys, providing contradictory information, giving bad open-text answers, and failing attention check questions could impact your ability to take surveys on Survey Honey. <br> The best way to be successful in Survey Honey's surveys are to read question carefully and provide honest feedback as you answer each question.`

                    ),

            new Question(
            
                    `Popular FAQ`,
                    `What's the value of a Honey Coin in USD?`,
                    `100 Coins is equivalent to $1 USD.`

                    ),

            new Question(
            
                    `Surveys`,
                    `How can I qualify for more surveys?`,
                    `We recommend filling out all provided profile surveys to increase your chances of matching with a survey.`

                    ),

            new Question(
            
                    `Surveys`,
                    `What devices can I use to access surveys?`,
                    `We recommend using your laptop or desktop computer. You can also access surveys on your mobile device, although some surveys are not fully optimized for mobile phones.`

                    ),

            new Question(
            
                    `Popular FAQ`,
                    `How do I get started?`,
                    `To get started, sign up at surveyhoney.com`

                    ),

            new Question(
            
                    `Account`,
                    `How do I sign in?`,
                    `You can sign in at  ________`

                    ),

            new Question(
            
                    `Account`,
                    `I forgot my password or need to change my password. What do I do?`,
                    `You can utilize the forgot password button the sign in page found here____hyperlink sign in page`

                    ),

            new Question(
            
                    `Account`,
                    `How do I unsubscribe from Survey Honey emails?`,
                    `Each of our emails has an unsubscribe link at the bottom of the message. `

                    ),

            new Question(
            
                    `Account`,
                    `What if I need to change the email address associated with my account?`,
                    ``

                    ),

            new Question(
            
                    `Coins`,
                    `Where do I check my Honey coins balance?`,
                    `Your HoneyCoins balance will be presented in the upper left portion of your dashboard when you log in. For a detailed breakout of your earnings over time, select "See History".`

                    ),

            new Question(
            
                    `Coins`,
                    `I took a survey but the points didn't show up in my 'current Coins.' What do I do?`,
                    `It may take up to 48 hours for Coins to be deposited into your account after completing surveys. If it's been longer than 48 hours and you completed the survey, please reach out to support@surveyhoney.com and reference your survey ID number. Note that the last survey you entered can be found on the History page.`

                    ),

            new Question(
            
                    `Coins`,
                    `Do my coins expire?`,
                    `Your coins will expire if not cashed out within 2 years.`

                    ),

            new Question(
            
                    `Account`,
                    `How do I update my contact/personal information?`,
                    ``

                    ),

            new Question(
            
                    `PayPal`,
                    `What is PayPal?`,
                    `PayPal is an online solution to give and receive money. Please visit www.paypal.com to learn more.`

                    ),

            new Question(
            
                    `PayPal`,
                    `How do I open a PayPal account?`,
                    `Visit https://www.paypal.com/welcome/signup/#/email_password to create an account.`

                    ),

            new Question(
            
                    `Surveys`,
                    `Who has access to my survey responses?`,
                    `The market research company conducting the survey will have access to all of its responses.`

                    ),

            new Question(
            
                    `Account`,
                    `How do I delete my Survey Honey account?`,
                    ``

                    ),

            new Question(
            
                    `Coins`,
                    `How does it take for my Survey Honey coins to hit my account after completing a survey?`,
                    `Survey Honey coins are credited instantly upon completing a survey most of the time. On rare occasions, it may take up to 48 hours for the coins to register in your account.`

                    ),

            new Question(
            
                    `Account`,
                    `Why can't I complete the two-step verification process to create an account?`,
                    `Survey participants must use a regular US cell phone carrier in order to be able to complete the two-step verification process. If you don't use a US cell phone carrier, you'll be unable to complete the two-step verification process.`

                    ),

            new Question(
            
                    `Surveys`,
                    `I'm seeing an error message that says 'please complete your surveys before starting more.' What do I need to do?`,
                    ``

                    ),

            new Question(
            
                    `Surveys`,
                    `I finished answering a survey but I received an error message that said I wasn't a good fit. What gives?`,
                    `Surveys can fill quickly -- if the survey closes/fills before you finish answering all of its questions, you'll receive a message stating that you weren't a good fit upon completion.`

                    ),

            new Question(
            
                    `Surveys`,
                    `A survey crashed when I was almost done with it. What do I do?`,
                    `We're sorry to hear that! Unfortunately, technical issues can pop up in online surveys, causing the survey to crash without allowing you to finish. You can report an issue related to the last survey you entered by navigating to the History page. Our team will investigate what happened with the aim of getting our participants back online as soon as possible. <br> While we can't allow you to re-enter the survey, you can check out other available surveys through your dashboard.`

                    ),

            new Question(
            
                    `Account`,
                    `Can I verify my account without a US phone number?`,
                    `Unfortunately, you must have a US phone number and a US verified PayPal account in order to take Survey Honey surveys. `

                    ),

            new Question(
            
                    `Surveys`,
                    `Why did the survey disqualify me before I completed it?`,
                    `Thank you for trying to complete one of our surveys! We understand that your time is precious and we're thankful that you opt to take surveys with us. <br> Each survey serves specific functions for each research company with which we work. To that end, if the answers you provide aren't consistent with the type of person they're looking to survey, your data will be excluded from the final data set as a result and the survey will end. <br> Sudden exits such as these aren't always based on your demographic information; they can be based your answers in-survey. For example, some surveys might ask you to confirm that you're reading each question by selecting a specific response choice. The best way to make sure that you don't get disqualified is to answer each question honestly and to read each question thoroughly before answering.`

                    ),

      
        ],
    },
})