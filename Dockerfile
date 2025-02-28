FROM public.ecr.aws/lambda/nodejs:12

# Copy function code and package.json
COPY build/src/StepFunctionTriggerer.js build/src/interfaces.js build/src/app.js package.json /var/task/

# Install NPM dependencies for function
RUN npm install

# Set the CMD to your handler
CMD [ "app.handler" ]
