# mail-events-controller
To use for aws LAMBDA and handle response from API Gateway and trigger a Step Function.

# Usage

1. Run `npm install`.
2. Make sure you fill the environment variables in an `.env` file, you can use the `.env.example` file as guide.
3. On the Terminal run `source .env` to generate the ENV variables on the shell.
4. For creating an ECR repository in which you will create the Lambda with, you can run the following MAKE commands
    * `make create-repo`
    * `make build-image`
    * `make upload`
5. Create your lambda function by setting the name of the `FUNCTION_NAME` ENV variable and in the AWS console choose the option to create with an image with the previoously created ECR repository and the :latest tag
6. Everytime you update the handler, on the project's terminal run `make build-image`, `make upload` and finally `make update` to update the Lambda function after your changes.
7. Make sure the Lambda has the Policies related to execute *State Functions* when testing.

# Unit Testing
All you have to do is run `make test`, it will compile and run the unit test for you.

# More Documents
[AWS Creating Lambda container images](https://docs.aws.amazon.com/lambda/latest/dg/images-create.html)
