const rabbitMqInstances:any[] = [];

const registerRabbitMq = (rabbitMqInstance: object) => {
    rabbitMqInstances.push(rabbitMqInstance);
};

const getRegisteredRmqInstances = () => rabbitMqInstances;

export {registerRabbitMq, getRegisteredRmqInstances}