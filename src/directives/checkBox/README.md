# check-box directive

This directive gives developers a beautiful, consistent checkbox.  For boolean decisions/options, it's best to use `<slide-toggle></slide-toggle>`.

## Usage

    <check-box ng-model="[expression]"><check-box>

### Options

* `value` - When `ng-model` is an array, this option will define the value this checkbox represents

### Notes

The following standard HTML attributes are supported:

* `id` - this attribute is passed to the hidden checkbox
* `name` - this attribute is passed to the hidden checkbox
* `required` - this attribute is passed to the hidden checkbox
* `class` - this attribute is passed to the outer most container