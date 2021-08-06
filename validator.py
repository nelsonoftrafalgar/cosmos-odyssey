from cerberus import Validator


def validate_inputs(first_name, last_name):
    spec = {'type': 'string', 'required': True,
            'maxlength': 20, 'regex': '[a-zA-Z\s]+$'}
    schema = {'firstName': spec, 'lastName': spec}
    validator = Validator(schema)
    return validator.validate({'firstName': first_name, 'lastName': last_name})
