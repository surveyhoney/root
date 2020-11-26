class Question {
    constructor(id, category, title, answer, display = false) {
        this.id = id;
        this.category = category;
        this.title = title;
        this.answer = answer;
        this.display = display
    }
}

var router = new VueRouter({
    mode: 'history',
    routes: []

});


var app = new Vue({
    el: '#app-helpdesk',
    router,
    methods: {

        searchCategory: function (topic) {
            this.categorySearchTerm = topic
            this.searchMethod = 'category'
            this.inputSearchTerm = ''
        },

        searchInput: function (){
            if(this.inputSearchTerm != ''){
                this.searchMethod = 'input'
                this.categorySearchTerm = 'Search'
            }
            else{
                if(this.categorySearchTerm == 'Search'){
                    this.categorySearchTerm = this.categories[0]
                    this.searchMethod = 'category'
                }
            }
        },

        searchQuery: function(){
            if(this.querySearchTerm != ''){
                this.searchMethod = 'query'
                this.categorySearchTerm = 'Help Article'
            }
        },

        contains: function (target, pattern){
            var value = 0;
            var len = pattern.length
            pattern.forEach(function(word){
              value = value + target.includes(word);
            });
            return (value === len) ? true: false
        },

        toggleNavigation(state){
            this.showMobileNavigation = state
        },

        resetSelection: function(){
            this.allQuestions.forEach(function(question){
                if(question.display){
                    question.display = false
                }
            })
        },
    },

    computed: {
        filteredQuestions() {
            this.showMobileNavigation = false
            
            if(this.searchMethod == 'input'){
                return this.allQuestions.filter(question => {
                    return (this.contains(question.title.toLowerCase(), this.inputSearchTerm.toLowerCase().split(' ')) || this.contains(question.answer.toLowerCase(), this.inputSearchTerm.toLowerCase().split(' ')))
                })
                
            }

            if(this.searchMethod == 'category'){
                return this.allQuestions.filter(question => {
                    return question.category.toLowerCase().includes(this.categorySearchTerm.toLowerCase())
                })
            }

            if(this.searchMethod == 'query'){
                return this.allQuestions.filter(question => {
                    if(question.id == this.querySearchTerm){
                        this.allQuestions[this.allQuestions.indexOf(question)].display = true
                        return true
                    }
                    return false
                    //return (question.id == this.querySearchTerm) ? true : false
                })
            }

        },

        isFilteredListEmpty() {
            try {
                this.filteredQuestions[0].title
                return false
            }
            catch{
                return true
            }
        },

        querySearchTerm() {
            if(this.$route.query.SearchID){
                this.searchMethod = 'query'
            }
            return this.$route.query.SearchID || ''
        }
    },

    watch: {
        inputSearchTerm: {
            handler: function(val, oldVal) {
                this.searchInput(); 
            },
            deep: true
        },

    },  

    mounted() {
        this.searchQuery()
    },

    data: {

        searchMethod: 'category',
        categorySearchTerm: 'Popular FAQ',
        inputSearchTerm: '',
        showMobileNavigation: false,

        categories: [
            'Popular FAQ',
            'Security (?)',
            'PayPal',
            'Surveys',
            'Coins',
            'Account',
        ],

        allQuestions: [
            
            new Question( `9ee9c6f4-efe9-42f8-a3dd-13ea8175fcc7`, `Popular FAQ`, `Can anyone become a member of Survey Honey?`, `Survey Honey may be used only by persons who are 18 years of age or older within the United States and its associated territories.` ),

            new Question( `52b2b583-4b57-4d7b-8823-a7cba1db4621`, `Popular FAQ`, `Why was I invited to an expired or closed survey?`, `Surveys can fill up quickly. You may sometimes receive a 'quota full' or 'this link has expired' response from the survey. <br> Don't worry, there are a plethora of other surveys for you to participate in!` ),

            new Question( `a78cc321-dc6c-42c2-b4d6-fd722bc016ee`, `Popular FAQ`, `How do I get paid?`, `In order to redeem a cashout via PayPal, you must meet the following criteria:
                        <br>-be located within the United States and confirm your location via two-factor authentication using a mobile phone.
                        <br>-have a PayPal verified account and
                        <br>-accrue a balance of equal to or greater than $12.50 USD.` ),

            new Question( `4808ccc6-e5f8-460f-85db-fbe6378745a7`, `Popular FAQ`, `What's the minimum amount that I can cash out and how quickly will my payment process?`, `SurveyHoney offers two repayment models - the traditional model, in which payment is issued within two weeks of the original cash out request, and the expedited model, in which payment is issued within 48 hours of the original cash out request minus 20% of the payout’s total. You must accrue a balance of $12.50 USD to cash out.` ),

            new Question( `68c9ec5c-4b43-4245-a3b5-57773590c8c0`, `Coins`, `How much can I earn answering surveys?`, `While you won't become a millionaire by answering surveys, you can continue to earn rewards earch day by supplying your feedback to researchers through our survey platform.` ),

            new Question( `53ac88d4-3a0c-406c-8da3-c2a977ee2a2e`, `Popular FAQ`, `How often will I receive surveys?`, `If you're subscribed to Survey Honey's emails, we'll let you know about new survey opportunities every few days! You also don't have to wait to hear from us. At any time you can log in and view all available surveys in your dashboard.` ),

            new Question( `4685a9b1-e663-4437-9d85-897f1446b299`, `Surveys`, `Why do surveys ask the same question more than once?`, `Sometimes researchers need to ask the same or similar questions multiple times in a survey because they're measuring specific metrics and looking for continuity in responses. <br> Answering honestly and consistently is the best way to handle these questions.` ),

            new Question( `a9a623e2-6039-4dd6-bc9a-9f2faea3cb58`, `Surveys`, `How much time does it take to complete a survey?`, `Survey times can vary. We recommend planning for each survey to take 10-15 minutes, though the estimated time to complete will be listed before you enter the survey.` ),

            new Question( `919de987-0db8-4cea-b019-df9dc501c63e`, `Surveys`, `How difficult are the surveys to complete?`, `To be a successful panelist on SurveyHoney you just need to be able to read and write English proficiently. <br> The most important piece to being a good survey participant is always providing your honest opinions and feedback.` ),

            new Question( `8cedc54f-b37f-4e78-9b27-f002256800e0`, `Surveys`, `There was a difference between the estimated time to complete a survey and the amount of time I spent in a survey. Why?`, `The estimated time to complete a survey is determined by the median amount of time spent by participants such as yourself. Some surveys route participants to different survey questions depending on your response choices, so you may be on a shorter or longer path to complete the survey.` ),

            new Question( `632e0500-b63b-4acd-a829-9a4956b36ecb`, `Surveys`, `What's the average qualification rate for surveys?`, `The average qualification rate for surveys is approximately 20%.` ),

            new Question( `b3474838-1fe9-476a-90b0-93bd22c29cd4`, `Security (?)`, `Why was my account blocked?`, `We ask our survey participants adhere to a Code of Conduct in order to use Survey Honey. Speeding through surveys, providing contradictory information, giving bad open-text answers, and failing attention check questions could impact your ability to take surveys on Survey Honey. <br> The best way to be successful in Survey Honey's surveys are to read question carefully and provide honest feedback as you answer each question.` ),

            new Question( `83efa609-66d5-47ad-878d-649b01a9ec2d`, `Popular FAQ`, `What's the value of a Honey Coin in USD?`, `100 Coins is equivalent to $1 USD.` ),

            new Question( `2e4d05dd-7d12-4f94-96bb-e79403c077d3`, `Surveys`, `How can I qualify for more surveys?`, `We recommend filling out all provided profile surveys to increase your chances of matching with a survey.` ),

            new Question( `88f08238-9bfc-4c92-b9b5-63e4345e5cf5`, `Surveys`, `What devices can I use to access surveys?`, `We recommend using your laptop or desktop computer. You can also access surveys on your mobile device, although some surveys are not fully optimized for mobile phones.` ),

            new Question( `d4449184-cde3-435b-95f8-811df8372560`, `Popular FAQ`, `How do I get started?`, `To get started, sign up at surveyhoney.com` ),

            new Question( `a6a5ef86-0942-42b9-a816-927545f7cd64`, `Account`, `How do I sign in?`, `You can sign in at  ________` ),

            new Question( `38478d26-1212-440f-8a8c-a07931fe1741`, `Account`, `I forgot my password or need to change my password. What do I do?`, `You can utilize the forgot password button the sign in page found here____hyperlink sign in page` ),

            new Question( `6c44a5f7-963b-4ed2-8b58-4416b42c90fc`, `Account`, `How do I unsubscribe from Survey Honey emails?`, `Each of our emails has an unsubscribe link at the bottom of the message. ` ),

            new Question( `b066053e-f433-41e3-96a9-314392562677`, `Account`, `What if I need to change the email address associated with my account?`, `` ),

            new Question( `806c3118-5bee-40ac-b77e-30452075cebd`, `Coins`, `Where do I check my Honey coins balance?`, `Your HoneyCoins balance will be presented in the upper left portion of your dashboard when you log in. For a detailed breakout of your earnings over time, select "See History".` ),

            new Question( `ccef018f-6205-4cd9-aa6c-d9651ee9e4a8`, `Coins`, `I took a survey but the points didn't show up in my 'current Coins.' What do I do?`, `It may take up to 48 hours for Coins to be deposited into your account after completing surveys. If it's been longer than 48 hours and you completed the survey, please reach out to support@surveyhoney.com and reference your survey ID number. Note that the last survey you entered can be found on the History page.` ),

            new Question( `beeae9f9-8a53-4ace-bd8d-bbfb71d32bfc`, `Coins`, `Do my coins expire?`, `Your coins will expire if not cashed out within 2 years.` ),

            new Question( `853f344a-e98e-42e8-ac4a-8971cc0f2d91`, `Account`, `How do I update my contact/personal information?`, `` ),

            new Question( `72e0771b-dbd2-486b-b88d-35fdcb65e091`, `PayPal`, `What is PayPal?`, `PayPal is an online solution to give and receive money. Please visit www.paypal.com to learn more.` ),

            new Question( `6f94f478-3cf2-405e-a647-0cbd6a2704dc`, `PayPal`, `How do I open a PayPal account?`, `Visit https://www.paypal.com/welcome/signup/#/email_password to create an account.` ),

            new Question( `5a122b2f-e7f0-4441-80b8-746b40f9bd00`, `Surveys`, `Who has access to my survey responses?`, `The market research company conducting the survey will have access to all of its responses.` ),

            new Question( `b9b3ef33-3f79-4540-a1d4-8c5dbccd63cc`, `Account`, `How do I delete my Survey Honey account?`, `Please contact support@surveyhoney.com to request your account me deleted.` ),

            new Question( `331dc5c1-389a-4b1d-8f5d-941b77531b19`, `Coins`, `How does it take for my Survey Honey coins to hit my account after completing a survey?`, `Survey Honey coins are credited instantly upon completing a survey most of the time. On rare occasions, it may take up to 48 hours for the coins to register in your account.` ),

            new Question( `92da3d33-7f54-4122-bffa-f9840fe9a425`, `Account`, `Why can't I complete the two-step verification process to create an account?`, `Survey participants must use a regular US cell phone carrier in order to be able to complete the two-step verification process. If you don't use a US cell phone carrier, you'll be unable to complete the two-step verification process.` ),

            new Question( `a99c66d2-e6b9-45fe-b889-41389d16aecb`, `Surveys`, `I'm seeing an error message that says 'please complete your surveys before starting more.' What do I need to do?`, `This error is often related to opening multiple surveys at once. By attempting just one survey at a time you will avoid this error.` ),

            new Question( `03ebc677-9868-4278-af29-0e10ccda4c7f`, `Surveys`, `I finished answering a survey but I received an error message that said I wasn't a good fit. What gives?`, `Surveys can fill quickly -- if the survey closes/fills before you finish answering all of its questions, you'll receive a message stating that you weren't a good fit upon completion.` ),

            new Question( `e678beeb-c575-4ab8-846a-d7dd64026258`, `Surveys`, `A survey crashed when I was almost done with it. What do I do?`, `We're sorry to hear that! Unfortunately, technical issues can pop up in online surveys, causing the survey to crash without allowing you to finish. You can report an issue related to the last survey you entered by navigating to the History page. Our team will investigate what happened with the aim of getting our participants back online as soon as possible. <br> While we can't allow you to re-enter the survey, you can check out other available surveys through your dashboard.` ),

            new Question( `340821de-0cad-49bb-96a8-7f48e6342e08`, `Account`, `Can I verify my account without a US phone number?`, `Unfortunately, you must have a US phone number and a US verified PayPal account in order to take Survey Honey surveys. ` ),

            new Question( `10f8c82b-c819-405c-9587-2a81ecbe0b0b`, `Surveys`, `Why did the survey disqualify me before I completed it?`, `Thank you for trying to complete one of our surveys! We understand that your time is precious and we're thankful that you opt to take surveys with us. <br> Each survey serves specific functions for each research company with which we work. To that end, if the answers you provide aren't consistent with the type of person they're looking to survey, your data will be excluded from the final data set as a result and the survey will end. <br> Sudden exits such as these aren't always based on your demographic information; they can be based your answers in-survey. For example, some surveys might ask you to confirm that you're reading each question by selecting a specific response choice. The best way to make sure that you don't get disqualified is to answer each question honestly and to read each question thoroughly before answering.` ),
              
        ],
    },
})