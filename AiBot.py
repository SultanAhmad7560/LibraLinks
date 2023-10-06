import openai
import sys


openai.api_key = "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"

prompt = str(sys.argv[1])

print(prompt)

request = openai.Completion.create(
    engine = "text-davinci-003",
    prompt = prompt,
    max_tokens = 1024,
    n = 1,
    stop = None,
    temperature = 0.5,
)

response = request.choices[0].text
print(response)