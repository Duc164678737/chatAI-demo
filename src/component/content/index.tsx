import React, { useState } from "react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  MessageModel,
} from "@chatscope/chat-ui-kit-react";

const API_KEY = "YOUR_API_KEY";

interface IContentProps {
  isToggleSideBar: boolean;
}

function Content({ isToggleSideBar }: IContentProps) {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState<MessageModel[]>([
    {
      message: "Hello, how can I help you?",
      sender: "Chat Bot",
      direction: "incoming",
      position: "single",
    },
  ]);

  const handleSend = async (message: string) => {
    const newMessage: MessageModel = {
      message: message,
      sender: "user",
      direction: "incoming",
      position: "single",
    };

    const newMessages = [...messages, newMessage];

    // update message
    setMessages(newMessages);

    // set a typing indicator
    setTyping(true);

    // process message to get a response
    await processMessageToChatGPT(newMessages);
  };

  const processMessageToChatGPT = async (chatMessage: MessageModel[]) => {
    // chatMessage {sender: "user" or "ChatGPT", message: "the messsage"}
    // in apiChatGPT (role: "user" or "assistant", content: "the messsage")

    let ApiMessage = chatMessage?.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return {
        role: role,
        content: messageObject.message,
      };
    });

    // role: "user" -> message from the user
    // "assistant" -> response from the chatGPT
    // system -> generally one initial message defining the model, can describe each action in detail for it

    const systemMessage = {
      role: "system",
      content: "who am i ?",
    };

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...ApiMessage],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data: any) => {
        const choice =
          data.choices && data.choices.length > 0 ? data.choices[0] : null;

        if (choice) {
          setMessages([
            ...chatMessage,
            {
              message: choice.message.content,
              sender: "ChatGPT",
              direction: "incoming",
              position: "single",
            },
          ]);

          setTyping(false);
        } else {
          console.error("No choices found in response:", data);
        }
      })
      .catch((error: any) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <div
      style={{
        position: "relative",
        height: "100vh",
        width: isToggleSideBar ? `calc(100vw - 80px)` : `calc(100vw - 200px)`,
      }}
    >
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={
              typing ? <TypingIndicator content="ChatBox is typing" /> : null
            }
          >
            {messages.map((message, index) => (
              <Message key={index} model={message} />
            ))}
          </MessageList>
          <MessageInput placeholder="Type a message..." onSend={handleSend} />
          <TypingIndicator content="John Doe is typing..." />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}

export default Content;
