import { useState, useRef, useEffect } from "react";
import {
  FaPaperclip,
  FaImage,
  FaSyncAlt,
  FaHome,
  FaSearch,
  FaEnvelope,
  FaCog,
  FaPlus,
  FaCommentAlt,
  FaCheckSquare,
  FaFileAlt,
  FaSpinner,
  FaPaperPlane,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const session = localStorage.getItem("session_id") || crypto.randomUUID();
    localStorage.setItem("session_id", session);
  }, []);

  const session_id = localStorage.getItem("session_id");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = {
      text: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          session_id: session_id, 
        }),
      });

      const data = await response.json();
      const botMessage = {
        text: data.response,
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage = {
        text: "Sorry, I couldn't process your request. Please try again.",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const promptSuggestions = [
    {
      text: "Write a to-do list for a personal project or task",
      icon: <FaCheckSquare className="h-4 w-4" />,
    },
    {
      text: "Generate an email to reply to a job offer",
      icon: <FaEnvelope className="h-4 w-4" />,
    },
    {
      text: "Summarize this article or text for me in one paragraph",
      icon: <FaFileAlt className="h-4 w-4" />,
    },
    {
      text: "How does AI work in a technical capacity",
      icon: <FaCommentAlt className="h-4 w-4" />,
    },
  ];

  const usePrompt = (promptText) => {
    setInput(promptText);
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 w-full">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
        <div className="p-4 flex items-center gap-3 border-b border-gray-200">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <img src="/cross.png" alt="" />
          </div>
          <span className="font-semibold text-lg text-gray-900 font-delius">
            AgentX
          </span>
        </div>

        <div className="flex-1 overflow-auto py-4">
          <div className="px-4 mb-4">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100">
              <FaPlus className="h-4 w-4" />
              New Chat
            </button>
          </div>

          <nav className="space-y-1 px-2">
            {[
              { icon: <FaHome className="h-4 w-4" />, label: "Home" },
              { icon: <FaSearch className="h-4 w-4" />, label: "Search" },
              { icon: <FaEnvelope className="h-4 w-4" />, label: "Messages" },
              { icon: <FaCog className="h-4 w-4" />, label: "Settings" },
            ].map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100"
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <FaUser className="text-gray-600" />
            </div>
            <div>
              <p className="font-medium text-sm text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Hamburger Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-30">
        <button
          onClick={toggleMobileMenu}
          className="p-2 rounded-full bg-white shadow-md"
        >
          {mobileMenuOpen ? (
            <FaTimes className="h-6 w-6 text-gray-700" />
          ) : (
            <FaBars className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={toggleMobileMenu}
        ></div>
      )}

      {/* Mobile Sidebar */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white z-20 transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 flex items-center gap-3 border-b border-gray-200">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
            <img src="/cross.png" alt="" />
          </div>
          <span className="font-semibold text-lg text-gray-900 font-delius">
            AgentX
          </span>
        </div>

        <div className="flex-1 overflow-auto py-4">
          <div className="px-4 mb-4">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-gray-300 hover:bg-gray-100">
              <FaPlus className="h-4 w-4" />
              New Chat
            </button>
          </div>

          <nav className="space-y-1 px-2">
            {[
              { icon: <FaHome className="h-4 w-4" />, label: "Home" },
              { icon: <FaSearch className="h-4 w-4" />, label: "Search" },
              { icon: <FaEnvelope className="h-4 w-4" />, label: "Messages" },
              { icon: <FaCog className="h-4 w-4" />, label: "Settings" },
            ].map((item, index) => (
              <button
                key={index}
                className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100"
                onClick={toggleMobileMenu}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
              <FaUser className="text-gray-600" />
            </div>
            <div>
              <p className="font-medium text-sm text-gray-900">John Doe</p>
              <p className="text-xs text-gray-500">john@example.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Show greeting and prompts only when there are no messages */}
        {messages.length === 0 && (
          <>
            <div className="p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-poppins">
                Hi there,{" "}
                <span className="text-gray-900 font-poppins">John</span>
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-1 font-poppins">
                What would you like to know?
              </h2>
              <p className="text-gray-500 mt-2">
                Use one of the common prompts below or ask your own question
              </p>
            </div>

            <div className="px-6 md:px-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {promptSuggestions.map((prompt, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-lg shadow cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => usePrompt(prompt.text)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1 bg-blue-100 p-2 rounded-full">
                        {prompt.icon}
                      </div>
                      <p className="text-sm text-gray-900 font-poppins">
                        {prompt.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-4 text-gray-500 flex items-center gap-2 hover:text-gray-700">
                <FaSyncAlt className="h-4 w-4" />
                Refresh Prompts
              </button>
            </div>

            <hr className="my-6 border-gray-200" />
          </>
        )}

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden flex flex-col px-6 md:px-8 pt-10">
          <div
            className="flex-1 overflow-y-auto pb-4 space-y-4"
            id="chat-messages"
          >
            {messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <FaCommentAlt className="mx-auto h-12 w-12 mb-4 opacity-50" />
                  <p>No messages yet. Start a conversation!</p>
                </div>
              </div>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex max-w-[80%] ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        msg.sender === "user"
                          ? "bg-blue-600 ml-3"
                          : "bg-gray-300 mr-3"
                      }`}
                    >
                      {msg.sender === "user" ? (
                        <FaUser className="text-white" />
                      ) : (
                        <img src="/cross.png" alt="AI" />
                      )}
                    </div>
                    <div>
                      <div
                        className={`rounded-lg p-3 ${
                          msg.sender === "user"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200"
                        }`}
                      >
                        <p className="text-sm font-poppins">{msg.text}</p>
                      </div>
                      <p
                        className={`text-xs text-gray-500 mt-1 ${
                          msg.sender === "user" ? "text-right" : "text-left"
                        }`}
                      >
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                    <img src="/cross.png" alt="AI" />
                  </div>
                  <div>
                    <div className="rounded-lg p-3 bg-gray-200">
                      <div className="flex items-center gap-2">
                        <FaSpinner className="h-4 w-4 animate-spin" />
                        <p className="text-sm font-poppins">Thinking...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} /> {/* Scroll anchor */}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border border-gray-200 rounded-lg mb-6">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Type your message..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                  {input.length}/1000
                </div>
              </div>
              <button
                onClick={sendMessage}
                disabled={input.trim() === "" || isLoading}
                className="rounded-full h-10 w-10 flex items-center justify-center bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FaPaperPlane className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
