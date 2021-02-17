# mail-events-controller
To use for aws LAMBDA and handle response from API Gateway

# Usage

1. Make sure you fill the environment variables in an `.env` file, you can use the `.env.example` file as guide.
2. On the Terminal run `source .env` to generate the ENV variables on the shell.
3. For creating an ECR repository in which you will create the Lambda with, you can run the following MAKE commands
    * `make create-repo`
    * `make build-image`
    * `make upload`
4. Create your lambda function by setting the name of the `FUNCTION_NAME` ENV variable and in the AWS console choose the option to create with an image with the previoously created ECR repository and the :latest tag
5. Everytime you update the handler, on the project's terminal run `make build-image`, `make upload` and finally `make update` to update the Lambda function after your changes.
