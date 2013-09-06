# slide-toggle directive

This directive gives developers a fancy way to present users with a yes or no choice.

## Usage

    <slide-toggle ng-model="[expression]"><slide-toggle>

### Options

* `onLabel` - Text to display when `ng-model` is true (Defaults to "On")
* `offLabel` - Text to display when `ng-model` is false (Defaults to "Off")

### Notes

The following standard HTML attributes are supported:

* `id` - this attribute is passed to the hidden checkbox
* `name` - this attribute is passed to the hidden checkbox
* `class` - this attribute is passed to the outer most container