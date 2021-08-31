const assert = require("assert")

const GreetFacrory = require("../greet-factory-function")


    describe("Setting and getting the values from user input", function () {



        it("Should set a name in the object array return the size of equal to 1", function () {
            let _grt = GreetFacrory();
            _grt.action("japanese","Vuyisa")
            assert.equal(1,_grt.getGreetCtr());
        })
        it("If same name is set twice the counter should not increase the _grt.getGreetCtr should be equal to 1.", function () {
            let _grt = GreetFacrory();
            _grt.action("japanese","Vuyisa")
            _grt.action("japanese","Vuyisa")
            assert.equal(1, _grt.getGreetCtr());

        })
        it("It should greet user in the Japanesse language", function () {
            let _grt = GreetFacrory()
            assert.equal(_grt.action("japanese", "Vuyisa"), "Konnichiwa, Vuyisa");

        })
        it("It should greet user in the Latin language", function () {
            let _grt = GreetFacrory()            
            assert.equal(_grt.action("latin", "Vuyisa"), "Salve, Vuyisa");

        })

        it("The user should be greeted in isiVenda language", function () {
            let _grt = GreetFacrory()            
            assert.equal(_grt.action("venda", "Vuyisa"), "Ndaa, Vuyisa");

        })
        it("It should return keys and there values in the object array", function () {
            let _grt = GreetFacrory()
            _grt.action("venda","Jake")
            _grt.action("latin","Mat")
            _grt.action("japanesse","luke")
            assert.deepEqual(_grt.greeted(), { Jake: 1, Mat: 1, Luke: 1 })
        })
        it("It should return the list of all the people greeted eg. blake, sam, james", function () {
            let _grt = GreetFacrory();
            _grt.action("venda","blake")
            _grt.action("venda","sam")
            _grt.action("venda","james")
            assert.equal(_grt.showAllGreets(), 'You have greeted -->: Blake,Sam,James')



        })



    })


describe("User error detection ", function () {


    it("After greeting Sam ,Samuel and Steve the test should display all the names greeted. ", function () {
        let _grt = GreetFacrory();
        _grt.action("latin","Sam");
        _grt.action("latin","Samuel");
        _grt.action("venda","Steve");

        assert.deepEqual(_grt.getGreetKeys(), ["Sam", "Samuel", "Steve"])

    })

    it("Error message should pop up if the user the clicks the greet button before entering their name in the text field.", function () {
        let _grt = GreetFacrory()
        let str = "";
        assert.equal(_grt.antiEmpty(str), "Please enter your name in text field eg.'Sam', then click the greet button to be greeted.")
    })


    it("It should return a warning message if user clicks the show all button without greeting A name first.", function () {
        let _grt = new GreetFacrory();
        assert.equal(_grt.showAllGreets(), "Type A name in the text field and click the show all button to display all the names you have greeted.")
    })



    
    it("It should return true if Digits exist in the string varible 'numAlpha'.", function () {
        let _grt = GreetFacrory();
        let numAlpha = "hello11"
        assert.equal(!!_grt.antiDigit(numAlpha), true)
    })
    it("It should return false if Digits do not exist in the string variable 'numAlpha", function () {
        let _grt = GreetFacrory();
        let numAlpha = "hello1"
        assert.equal(!_grt.antiDigit(numAlpha), false)
    })


})
