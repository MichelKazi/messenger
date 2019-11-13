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
    message.readReceipt = 'Delivered'
    this.outbox.push(message)
    receiver.inbox.push(message)
    return `Your message to ${receiver.name} is sent`
  }
  //when a message is read, that object's read value is changed to true, and a read receipt is provided
  readMessage(i){
    let date = new Date()
    if (this.inbox[i].read === false){
      this.inbox[i].readReceipt = `Read at ${date.toLocaleTimeString('en-US')}`
      this.inbox[i].read = true
    }
    return this.inbox[i].content
  }

  readLastMessage(i){
    let date = new Date()
    if (this.inbox[this.inbox.length-1].read === false){
      this.inbox[this.inbox.length-1].readReceipt = `Read at ${date.toLocaleTimeString('en-US')}`
      this.inbox[this.inbox.length-1].read = true
    }
    return this.inbox[this.inbox.length-1].content
  }

  unreadMessage(i){
    this.inbox[i].read = false
    this.inbox[i].readReceipt = ''
  }

  filterUnread(){
    return this.inbox.filter(msg => {
      return msg.read === false
    } );
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

//grouochat needs people
class Groupchat {
  constructor(user){
    this.admin = user
    this.users = [user]
    this.chatbox = []
  }
  addUser(user) {
    this.users.push(user)
    return `${user.name} joined the chat`
  }
  kickUser(user) {
    this.users.splice(users.indexOf(user))
  }
}

let user1 = new User('Michael')
let user2 = new User('Ryan')
user1.sendMessage(user2, 'hey buddy')
user1.sendMessage(user2, 'hey please respond')
user2.readLastMessage()


// any object based on a class is called an instance
// an instance represents one object based on the class name
