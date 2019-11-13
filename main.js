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
    this.groupConvos = [] // in case user is in many groupchats
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
    let time = Date().toLocaleTimeString('en-US')
    if (this.inbox[i].read === false){
      this.inbox[i].readReceipt = `Read at ${time}`
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

  filterRead(){
    return this.inbox.filter(msg => {
      return msg.read === true
    } );
  }

  createGroupChat(name, user) {
    let chat = new Groupchat(name, user)
    this.groupConvos.push(chat)
    chat.users.shift(this)
    return `${chat.name} was created`
  }

  groupMessage(groupchat, content) {
    if (groupchat.users.includes(this)) {
      let time = Date().toLocaleTimeString('en-US')
      let msg = new Message(groupchat, content)
      groupchat.chatbox.push(`${this.name}:\n${content}\n${time}\n\n`)
      return `Your message was sent in ${groupchat.name}`
    }
    return `You're not in this chat!`
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

//groupchat needs a name and people
class Groupchat {
  constructor(name, user){
    this.name = name
    this.users = [user]
    this.chatbox = []
  }
  displayMessages() {
    console.log(`----${this.name}----`);
    for (msg in this.chatbox) {
      console.log(msg);
    }
  }
  displayUsers() {
    for (u in this.users)
      console.log(`Users: ${u.name}`);
  }
  addUser(user) {
    this.users.push(user)
    return `${user.name} joined the chat`
  }
  kickUser(user) {
    if (users.includes(user)){
      this.users.splice(users.indexOf(user))
      return `${user.name} has left the chat`
    }
    return `${user.name} is not in this chat`
  }
}

let user1 = new User('Michael')
let user2 = new User('Ryan')
user1.sendMessage(user2, 'hey buddy')
user1.sendMessage(user2, 'hey please respond')
user2.readLastMessage()


// any object based on a class is called an instance
// an instance represents one object based on the class name
