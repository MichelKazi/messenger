// A user needs to be able to send messages
// messages need to be stored with the user they belong to
// need to be able to read individual messages

//user.inbox --> that person's messages
// user.sendMessage('Ryan', 'hello')
class User {
  constructor(name) {
    this.name = name
    this.inbox = []
    this.outbox = []
    this.blocklist = []
  }

  sendMessage(receiver, content) {
    let message = new Message(receiver, content)
    this.outbox.push(message)
    receiver.inbox.push(message)
    return `your message to ${receiver.name} is sent`
  }

  readMessage(i){
    return this.inbox[i].content
  }

  readLastMessage(){
    return this.inbox.peekBack()
  }

  block(user){
    
  }

}

class Message {
  constructor(receiver, content) {
    this.receiver = receiver
    this.content = content
  }
}

let user1 = new User('Michael')
let user2 = new User('Ryan')

// any object based on a class is called an instance
// an instance represents one object based on the class name
