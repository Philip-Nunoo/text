import SimpleSchema from 'simpl-schema';
import LongTextField from 'uniforms-bootstrap4/LongTextField';

export default new SimpleSchema({
    name: {
        type: String
    },
    description: {
        type: String,
        optional: true,
        uniforms: {
            component: LongTextField
        }
    },
    active: {
        type: Boolean,
        defaultValue: true
    }
});