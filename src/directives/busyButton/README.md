# busy-button directive

Prevents ng-clicks from being process multiple times while a promise is yet to be resolved

## Usage

    <button busy-button="Saving..." ng-click="save()">Save</button>

### Notes

Currently only works with `ng-click`