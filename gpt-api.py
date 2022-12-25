import openai
import sys
import os

# Use the API key to authenticate the GPT-3 API
openai.api_key = ""


# Define a function to complete a given prompt using the GPT-3 API
def complete_prompt(prompt):
    # Use the GPT-3 API to generate completions for the given prompt
    completions = openai.Completion.create(
        engine="text-davinci-002",
        prompt=prompt,
        max_tokens=2000,
        n=3,
        temperature=.7
    )

    # Extract the generated text from the API response
    generated_text = completions.choices[0].text

    # Return the generated text
    return generated_text

# Set a flag to control the loop
prompt_received = False

# Prompt the user for a prompt to complete
while not prompt_received:
    prompt = input("Enter a prompt to complete: ")
    if prompt:  # check if the user entered a non-empty string
        prompt_received = True

# Prompt the user for a file to include with the prompt
file_name = input("Enter the name of the file to include with the prompt: ")

# Get the current working directory
cwd = os.getcwd()

# Create the full file path using the current working directory and the file name
file_path = os.path.join(cwd, file_name)

# Open the file in read mode and read its contents
with open(file_path, "r") as file:
    file_contents = file.read()

# Add the contents of the file to the end of the prompt
prompt += f'\n{file_contents}'

# Set a flag to control the loop
create_new_file_received = False

# Prompt the user for a file to rewrite
while not create_new_file_received:
    create_new_file = input("Do you want to create a new file? (True or False): ").lower()
    if create_new_file in ["true", "false"]:  # check if the user entered a valid string
        create_new_file_received = True

if create_new_file == "true":
    # Prompt the user for a file name for the new file
    new_file_name = input("Enter the name of the new file: ")

    # Create the full file path for the new file using the current working directory and the file name
    new_file_path = os.path.join(cwd, new_file_name)

    # Open the new file in write mode
    with open(new_file_path, "w") as file:
        # Use the completion function to generate a response to the prompt
        generated_text = complete_prompt(prompt)

        # Write the generated text to the file
        file.write(generated_text)

        # Close the file
        file.close()

else:
    # Open the file in write mode
    with open(file_path, "w") as file:
    # Use the completion function to generate a response to the prompt
        generated_text = complete_prompt(prompt)

        # Write the generated text to the file
        file.write(generated_text)

        # Close the file
        file.close()

    