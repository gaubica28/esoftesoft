function deepCopy(obj, visited = new Map()) {
    if (visited.has(obj)) {
        return visited.get(obj);
    }

    if (typeof obj !== 'object' || obj == null) {
        return obj;
    }

    let copy;

    if (obj instanceof Date) {
        copy = new Date(obj);
    } else if (obj instanceof Map) {
        copy = new Map();
        visited.set(obj, copy);
        obj.forEach((value, key) => {
            copy.set(key, deepCopy(value, visited));
        });
    } else if (obj instanceof Set) {
        copy = new Set();
        visited.set(obj, copy);
        obj.forEach((value) => {
            copy.add(deepCopy(value, visited));
        });
    } else if (Array.isArray(obj)) {
        copy = [];
        visited.set(obj, copy);
        obj.forEach((item) => {
            copy.push(deepCopy(item, visited));
        });
    } else {
        copy = Object.create(Object.getPrototypeOf(obj));
        visited.set(obj, copy);
        const descriptors = Object.getOwnPropertyDescriptors(obj);

        Object.keys(descriptors).forEach((key) => {
            const descriptor = descriptors[key];

            if (descriptor.value) {
                descriptor.value = deepCopy(descriptor.value, visited);
            }

            Object.defineProperty(copy, key, descriptor);
        });
    }

    return copy;
}