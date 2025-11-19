class Validator {
    run(data) {
        const errors = [];
        if (data.name.length === 0) {
            errors.push('Dane w polu Imię i Nazwisko są niepoprawne!');
        } if (!data.email.includes('@')) {
            errors.push('Dane w polu Email są niepoprawne!');
        }
        return errors;
    }
}
export default Validator;