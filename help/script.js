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
Vue.config.devtools = false
var app = new Vue({
    el: '#app-helpdesk',
    router,
    methods: {

        searchCategory: function (topic = 'Popular FAQ') {
            this.searchMethod = 'category'
            this.categorySearchTerm = topic
            this.inputSearchTerm = ''
        },

        searchInput: function () {
            if (this.inputSearchTerm != '') {
                this.searchMethod = 'input'
                this.categorySearchTerm = 'Search'
            }
            else {
                if (this.categorySearchTerm == 'Search') {
                    this.searchMethod = 'category'
                    this.categorySearchTerm = this.categories[0]
                }
            }
        },
 
        triggerQuery: function () {
            if (this.querySearchID != '') {
                this.searchMethod = 'query'
                this.categorySearchTerm = 'Help Article'
            }
            else if (this.querySearchCategory != '') {
                this.searchCategory(this.querySearchCategory)
            }
        },

        contains: function (target, pattern) {
            var value = 0;
            var len = pattern.length
            pattern.forEach(function (word) {
                value = value + target.includes(word);
            });
            return (value === len) ? true : false
        },

        toggleNavigation(state) {
            this.showMobileNavigation = state
        },

        resetSelection: function () {
            this.allQuestions.forEach(function (question) {
                if (question.display) {
                    question.display = false
                }
            })
        },

        generateQuestionList: function (data) {
            var allQuestions = []
            var categories = []
            
            data.forEach(function (question, index) {
                if(index == 0) return
                var question_id = question[0]
                var question_category = question[1]
                var question_title = question[2]
                var question_answer = question[3]

                allQuestions.push(new Question(question_id, question_category, question_title, question_answer))

                if (!categories.includes(question_category)) {
                    categories.push(question_category)
                }

            })

            this.categories = categories
            this.allQuestions = allQuestions
        }
    },

    computed: {
        filteredQuestions() {
            this.showMobileNavigation = false

            if (this.searchMethod == 'input') {
                return this.allQuestions.filter(question => {
                    return (this.contains(question.title.toLowerCase(), this.inputSearchTerm.toLowerCase().split(' ')) || this.contains(question.answer.toLowerCase(), this.inputSearchTerm.toLowerCase().split(' ')))
                })

            }

            if (this.searchMethod == 'category') {
                return this.allQuestions.filter(question => {
                    return question.category.toLowerCase().includes(this.categorySearchTerm.toLowerCase())
                })
            }

            if (this.searchMethod == 'query') {
                return this.allQuestions.filter(question => {
                    if (question.id == this.querySearchID) {
                        this.allQuestions[this.allQuestions.indexOf(question)].display = true
                        return true
                    }
                    return false
                })
            }

        },

        isFilteredListEmpty() {
            try {
                this.filteredQuestions[0].title
                return false
            }
            catch {
                if (this.searchMethod == 'category') {
                    this.searchCategory()
                    return false
                }
                return true
            }
        },

        querySearchID: {
            get: function () {
                return this.$route.query.search_id || ''
            },
        },

        querySearchCategory: {
            get: function () {
                return this.$route.query.focus_topic || ''
            },
        },
    },

    watch: {
        inputSearchTerm: {
            handler: function (val, oldVal) {
                this.searchInput();
            },
            deep: true
        },

    },

    mounted() {
        this.triggerQuery()

        $.ajax({
            type: "GET",  
            url: "resources/question-bank.csv",
            dataType: "text",       
            success: function(response)  
            {
              data = $.csv.toArrays(response);
              app.generateQuestionList(data);
            }   
          });

    },

    data: {
        searchMethod: 'category',
        categorySearchTerm: 'Popular FAQ',
        inputSearchTerm: '',
        showMobileNavigation: false,
        categories: [],
        allQuestions: [],
    },
})