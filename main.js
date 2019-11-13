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
    if (receiver.blocklist.includes(this)) {
      return `Your message to ${receiver.name} could not be sent!`
    }
    let message = new Message(receiver, content)
    this.outbox.push(message)
    receiver.inbox.push(message)
    return `Your message to ${receiver.name} is sent`
  }
  //when a message is read you can
  readMessage(i){
    let date = new Date()
    this.inbox[i].read = true
    this.inbox[i].readReceipt = `Read at ${date.toLocaleTimeString('en-US')}`
    return this.inbox[i].content
  }

  unreadMessage(i){
    this.inbox[i].read = false
    this.inbox[i].readReceipt = ''
  }

  block(user){
    this.blocklist.push(user)
    return `you blocked ${user.name}!`
  }

}

class Message {
  constructor(receiver, content) {
    this.receiver = receiver
    this.content = content
    this.read = false
    this.readReceipt = ''
  }
}

let user1 = new User('Michael')
let user2 = new User('Ryan')
user1.sendMessage(user2, 'hey buddy')
user1.sendMessage(user2, 'hey please respond')


// any object based on a class is called an instance
// an instance represents one object based on the class name
