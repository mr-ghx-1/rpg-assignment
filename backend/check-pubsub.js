const { PubSub, PubSubEngine } = require('graphql-subscriptions');

try {
    const pubSub = new PubSub();
    console.log('Own properties:', Object.getOwnPropertyNames(pubSub));
    console.log('Has asyncIterator?', typeof pubSub.asyncIterator);

    if (typeof pubSub.asyncIterator === 'function') {
        const iterator = pubSub.asyncIterator('test');
        console.log('Iterator created successfully');
    } else {
        console.log('asyncIterator is NOT a function');
        console.log('Prototype chain:', inspectChain(pubSub));
    }
} catch (e) {
    console.error('Error:', e.message);
}

function inspectChain(obj) {
    const chain = [];
    let proto = Object.getPrototypeOf(obj);
    while (proto) {
        chain.push(proto.constructor.name);
        proto = Object.getPrototypeOf(proto);
    }
    return chain;
}
