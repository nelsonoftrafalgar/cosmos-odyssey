from cerberus import Validator


def validate_inputs(first_name, last_name):
    spec = {'type': 'string', 'required': True,
            'maxlength': 20, 'regex': '[a-zA-Z\s]+$'}
    schema = {'first_name': spec, 'last_name': spec}
    validator = Validator(schema)
    return validator.validate({'first_name': first_name, 'last_name': last_name})
