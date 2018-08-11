const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const assert = require("assert")
const emitter = require("../emitter")
const testserver = require("../server")

describe("NodeTest", function() {
    it("manager", function(){
        let manager = emitter.manager
        assert(manager, "emitter.manager exists")
    })
    it("response", function(){
        let manager = emitter.manager
        manager.emit("request", {abcde: "mydata"})
        let response = manager.response
        assert(response, "emitter.manager.response exists")
    })
    it("data", function(){
        let manager = emitter.manager
        manager.emit("request", {abcde: "mydata"})
        let response = manager.response
        assert(response.data === "data", "Data appended")
    })
    it("mydata", function(){
        let manager = emitter.manager
        manager.emit("request", {abcde: "mydata"})
        let response = manager.response
        assert(response.abcde === "mydata", "Data sent")
    })
    it("Server", function(done){
        try {
            let server = testserver.server
            assert(server, "Server exists")
            let req = new XMLHttpRequest()
            req.open('GET', 'http://localhost:3000', true);
            req.onreadystatechange = function() {
                if (req.readyState == 4) {
                    if(req.status == 200) {
                        const text = req.responseText
                        assert(text, "Have response")
                        assert(text.trim().toLowerCase() === "hello world", "Correct response")
                        done()
                    }
                }
            };
            req.send(null);
        } catch(e) {
            done(e)
        }
        // Остановка через секунду
        setTimeout(()=>{server.close()}, 1000)
    })
})