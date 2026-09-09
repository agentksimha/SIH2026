from typing import TypedDict
from sentence_transformers import SentenceTransformer
import numpy as np
import faiss
from langgraph.graph import START,END,StateGraph
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import HumanMessage
import os
from dotenv import load_dotenv
import time
from pathlib import Path

start=time.time()
load_dotenv()
api_key=os.getenv('GOOGLE_API_KEY')
model_name=os.getenv('GEMINI_MODEL')
model=ChatGoogleGenerativeAI(model=model_name,api_key=api_key)

embeddor = SentenceTransformer("BAAI/bge-small-en-v1.5")
BASE_DIR=Path(__file__).resolve().parent.parent
INDEX_PATH=BASE_DIR/'storage'/'vectors.index'
index=faiss.read_index(str(INDEX_PATH))
k=min(5,index.ntotal)

class State(TypedDict):
    query:str
    embedding:np.ndarray
    indices:np.ndarray
    context:str
    img_context:list
    table_context:list
    response:str

#--> This function embeds the user query recieved through FastAPI endpoint
def embed_query(state:State)->State:
    query=state['query']
    embedding=embeddor.encode([query], normalize_embeddings=True)
    state['embedding']=embedding
    return state

#--> This function picks the top k (<=5) relevant chunks from the vector database
def top_k(state:State)->State:
    embedding=state['embedding']
    scores,indices=index.search(embedding,k=k)
    # print(scores)
    # print(indices)
    state['indices']=indices
    return state

#--> This function gathers relevant context
def gather_context(state:State)->State:
    #-> Code here will gather context from the database including text, images and tables
    state['context']=''
    state['img_context']=[]
    state['table_context']=[]
    return state

#--> This function calls the LLM for response
def call_llm(state:State)->State:
    response=''
    content=[
            {'type':'text',
            'text':f'''Answer the following question using retrieved context
            
            Question:
            {state['query']}

            Retrieved Context:
            {state['context']}
            '''
            }
        ]

    for image_path in state['img_context']:
        content.append(
            {'type':'image_url',
             'image_url':image_path}
        )

    message=HumanMessage(content=content)
    response=model.invoke([message])
    state['response']=response.content
    return state


#--> Code for making the workflow and langgraph graph
graph=StateGraph(State)

graph.add_node('embed_query',embed_query)
graph.add_node('top_k',top_k)
graph.add_node('gather_context',gather_context)
graph.add_node('call_llm',call_llm)

graph.add_edge(START,'embed_query')
graph.add_edge('embed_query','top_k')
graph.add_edge('top_k','gather_context')
graph.add_edge('gather_context','call_llm')
graph.add_edge('call_llm',END)

#-->query_workflow is compiled
query_workflow=graph.compile()

# #--> invoking the workflow
# for message,metadata in query_workflow.stream({'query':'Write a 30 line essay on blachole'},stream_mode='messages'):
#     if message.content:
#         print(message.content[0]['text'],end='',flush=True)

# print('\n\ntime taken : ',time.time()-start)
# #workflow.invoke()