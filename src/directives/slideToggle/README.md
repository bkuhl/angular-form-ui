# slide-toggle directive

This directive gives developers a fancy way to present users with a yes or no choice.

## Usage

    <slide-toggle ng-model="[expression]"><slide-toggle>

### Options

* `on-label` - Text to display when `ng-model` is true (Defaults to "On")
* `off-label` - Text to display when `ng-model` is false (Defaults to "Off")
* `disable-triggers-on-watch` - When `ng-model` changes, don't trigger the on/off expressions

### Notes

The following standard HTML attributes are supported:

* `id` - this attribute is passed to the hidden checkbox
* `name` - this attribute is passed to the hidden checkbox
* `class` - this attribute is passed to the outer most container