import React, { useState } from "react";
import MyProfiles from "./MyProfilesSidebar";
import "../styles/Chatsection.css";
import ChatPerson from "../components/ChatPerson";
import { RiSendPlaneFill } from "react-icons/ri";
import { BsEmojiSmile } from "react-icons/bs";
import { CiImageOn } from "react-icons/ci";
import { IoIosCall, IoIosVideocam } from "react-icons/io";
import LayoutwithoutFooter from "../components/LayoutwithoutFooter";

const ChatSection = () => {
  const [showContent, setShowContent] = useState(false);
  const [message, setMessage] = useState("");

  const handleButtonClick = () => {
    setShowContent(!showContent);
  };
  const handleSelectEmoji = (emoji) => {
    setMessage(message + emoji);
  };

  
  return (
    <>
      <LayoutwithoutFooter>
        <div className="container">
          <div className="chatsection py-5">
            <div className="messagesection">
              {/* <div className="profilesection">  
         <MyProfiles/>        
         </div> */}
              <div className="chat-friend-list">
                <h2>Chat</h2>
                <form>
                  <input type="text" name="search" placeholder="Search.." />
                </form>
                <div className="chat-friend">
                  <ChatPerson />
                  <ChatPerson />
                  <ChatPerson />
                  <ChatPerson />
                  <ChatPerson />
                  <ChatPerson />
                  <ChatPerson />
                  <ChatPerson />
                  <ChatPerson />
                  <ChatPerson />
                  <ChatPerson />
                </div>
              </div>
              <div className="chat mt-4">
                <div className="chat-name">
                  <div className="chat-name-userdata">
                    <img
                      src="https://www.circumcisionpro.co.uk/wp-content/uploads/2021/05/avatar-profile-picture.jpg"
                      alt="chat-profile"
                    />
                    <div className="chat-name-data">
                      <h5>
                        Sunder Pichai{" "}
                        <div className="chat-online-offline"></div>
                      </h5>
                      <p>active 2 hours ago</p>
                    </div>
                  </div>
                  <div className="chat-name-icons">
                    <IoIosCall className="chat-voice-icon" />
                    <IoIosVideocam className="chat-video-icon" />
                  </div>
                </div>
                <div className="message-box">
                  <div className="chat-box">
                    <div className="chat-box-left">
                      <img
                        src="https://www.circumcisionpro.co.uk/wp-content/uploads/2021/05/avatar-profile-picture.jpg"
                        alt="chat-profile"
                      />
                      <p>
                        {" "}
                        I feel like we have something really special together,
                        and I want to take things to the next level.
                      </p>
                    </div>
                    <div className="chat-box-right">
                      <p> What do you mean?</p>
                      <img
                        src="https://www.circumcisionpro.co.uk/wp-content/uploads/2021/05/avatar-profile-picture.jpg"
                        alt="chat-profile"
                      />
                    </div>
                    <div className="chat-box-left">
                      <img
                        src="https://www.circumcisionpro.co.uk/wp-content/uploads/2021/05/avatar-profile-picture.jpg"
                        alt="chat-profile"
                      />
                      <p> I mean that I want to ask you to marry me. </p>
                    </div>
                    <div className="chat-box-right">
                      <p>
                        {" "}
                        I feel the same way and I want to make sure we're both
                        on the same page.
                      </p>
                      <img
                        src="https://www.circumcisionpro.co.uk/wp-content/uploads/2021/05/avatar-profile-picture.jpg"
                        alt="chat-profile"
                      />
                    </div>
                    <div className="chat-box-left">
                      <img
                        src="https://www.circumcisionpro.co.uk/wp-content/uploads/2021/05/avatar-profile-picture.jpg"
                        alt="chat-profile"
                      />
                      <p>
                        {" "}
                        Of course, I understand. I just think that we're ready
                        for this step.
                      </p>
                    </div>
                    <div className="chat-box-right">
                      <p>
                        That's true. But what about our careers and our future
                        plans? We need to make sure we're on the same page about
                        those things too.
                      </p>
                      <img
                        src="https://www.circumcisionpro.co.uk/wp-content/uploads/2021/05/avatar-profile-picture.jpg"
                        alt="chat-profile"
                      />
                    </div>
                    <div className="chat-box-left">
                      <img
                        src="https://www.circumcisionpro.co.uk/wp-content/uploads/2021/05/avatar-profile-picture.jpg"
                        alt="chat-profile"
                      />
                      <p>
                        {" "}
                        Absolutely. I think we should sit down and talk about
                        our goals and how we see our lives together. But
                        ultimately, I just want to spend the rest of my life
                        with you.
                      </p>
                    </div>
                    <div className="chat-box-right">
                      <p>
                        That's all I needed to hear. Yes, let's talk about our
                        future together and make sure we're ready for this step.
                        But I can't imagine spending my life with anyone else
                        but you.
                      </p>
                      <img
                        src="https://www.circumcisionpro.co.uk/wp-content/uploads/2021/05/avatar-profile-picture.jpg"
                        alt="chat-profile"
                      />
                    </div>
                  </div>
                </div>
                {showContent && (
                  <div className="emojieselection">
                    <button onClick={() => handleSelectEmoji("😀")}>😀</button>
                    <button onClick={() => handleSelectEmoji("😍")}>😍</button>
                    <button onClick={() => handleSelectEmoji("👍")}>👍</button>
                    <button onClick={() => handleSelectEmoji("❤️")}>❤️</button>
                  </div>
                )}
                <div className="chat-write">
                  <CiImageOn className="photoIcon" />
                  <div className="emojisection">
                    <BsEmojiSmile
                      className="emojiIcon"
                      onClick={handleButtonClick}
                    />
                  </div>
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write a message..."
                  />
                  <RiSendPlaneFill className="sendIcon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutwithoutFooter>
    </>
  );
};

export default ChatSection;
