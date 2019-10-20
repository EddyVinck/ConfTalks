module.exports = {
    getRandomEntity(db, type, predicate = () => true) {
        const values = [...db.get(type).value()];
        const filteredValues = values.filter(predicate);
        const random = filteredValues.sort(() => 0.5 - Math.random())[0];

        return random;
    }
};
