import os
from openai import OpenAI

from dotenv import load_dotenv

load_dotenv()

class LLM:
    def __init__(self, api_key):
        self.client = OpenAI(api_key=api_key)

    def generate_response(self, prompt, model="gpt-3.5-turbo", max_tokens=150):
        try:
            response = self.client.chat.completions.create(
                model=model,
                messages=[
                    {"role": "user", "content": prompt}
                ],
                max_tokens=max_tokens
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error: {str(e)}"

    def generate_with_context(self, conversation_history, model="gpt-3.5-turbo", max_tokens=150):
        try:
            response = self.client.chat.completions.create(
                model=model,
                messages=conversation_history,
                max_tokens=max_tokens
            )
            return response.choices[0].message.content
        except Exception as e:
            return f"Error: {str(e)}"

api_key = os.getenv('OPENAI_API_KEY')
llm = LLM(api_key)

#EXAMPLE OF WHAT THE LIST SHOULD LOOK LIKE FOR A STORED DATASET
# openai_history = [
#     # ex on how it's called:
#     # {"role": "user", "content": "What is Python?"},
#     # {"role": "assistant", "content": "Python is a high-level programming language..."},
# ]

def OpenAICall(input_variable, chat_history):
    # append "role": "user" and "content":input_variable to a dataset
    chat_history.append({"role":"user", "content":input_variable})
    prompt = f"Please make the following data concise and under 100 words: {input_variable}"
    response = llm.generate_response(prompt)
    # append "role": "assistant" and "content":response to a dataset
    chat_history.append({"role":"assistant", "content": response})

    return response

def OpenAICallResponse(input_variable, chat_history):
    # Example with conversation history
    
    # append "role": "user" and "content":input_variable to a dataset
    chat_history({"role":"user","content":input_variable})
    conversation = chat_history
    response = llm.generate_with_context(conversation)
    # append "role": "assistant" and "content":response to a dataset
    chat_history.append({"role":"assistant", "content": response})

    return response


# if __name__ == "__main__":
    # input_test = "funny little test. this is super verbose and stuff"
    # chat_history= []
    # print(OpenAICall(input_test,chat_history))
    # print(chat_history)