'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  return (
    <>
      <h1 className="flex flex-col w-full max-w-md py-24 mx-auto text-center text-3xl font-bold">
        Welcome to the Star Wars Chat!
      </h1>
      <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === 'user' ? (
              <>
                <span className="font-bold">User</span>: {m.content}
              </>
            ) : (
              <>Yoda: {m.content}</>
            )}
          </div>
        ))}

        <form>
          <input
            className="fixed bottom-0 w-full max-w-md p-2 mb-14 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
          <button
            className="fixed bottom-2 w-full max-w-md bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
            onClick={handleSubmit}
          >
            Talk to Yoda
          </button>
        </form>
      </div>
    </>
  );
}
