# Super Page Designer :paintbrush:
A plugin for Salesforce Commerce Cloud to enhance page designer experience. The plugin provides a range of components and custom editors to give the users control on page designer to build great pages via configuration.

## Prerequisites
Before you install the "Super Page Designer (SPD)" plugin, make sure that you:

1) Have access to a SFCC instance.
2) Installed the [Storefront Reference Architecture (SFRA)][1] cartridge.

## Installation
For a straightforward installation use the precompiled version included with the [release](https://github.com/sfccplus/super-page-designer/releases/latest).

### Step 1: Import the metadata

1) Zip the `metadata` folder.
2) In the Business Manager, go to Administration > Site Development > Site Import & Export and import the zipped file.
<br/>

### Step 2: Set up the cartridges path
First, upload the cartridges provided inside the `cartridges` folder, then:

**1) Add components:**
1) Go to Administration > Sites > Manage Sites > [yourSite] > Settings.
2) In the Cartridges field, add `sfcc_super_pd` to the cartridge path.
<br/>

**2) Add required editors to page designer:**
1) Go to Administration > Sites > Manage Sites > Business Manager.
2) In the Cartridges field, add `bm_sfcc_super_pd` to the cartridge path.
<br/>

## Configuration (Optional)
To gain more control over the plugin you can configure SPD via: `Merchant Tools > Custom Preferences > Super PD Configs`

### Breakpoints
You can adjust the breakpoints for mobile, tablet and desktop used by the different components, for example:

```json
{
    "mobile": {
        "maxWidth": 767.99
    },
    "tablet": {
        "minWidth": 768,
        "maxWidth": 1023.99
    },
    "desktop": {
        "minWidth": 1024
    }
}
```

### Font Families
Control which font families to be used in rich text editor to match your global styling, for example:
```json
{
    "Andale Mono": "andale mono,times",
    "Arial": "arial,helvetica,sans-serif",
    "Arial Black": "arial black,avant garde",
    "Book Antiqua": "book antiqua,palatino",
    "Comic Sans MS": "comic sans ms,sans-serif"
}
```

### Font Sizes
To match you design needs, font sizes used in the rich text editor can also be controlled, for example:
```
// Enter font sizes separated with spaces

12px 16px 24px 32px
```
> **Note:** You can also use responsive font sizes like: 2vw 5vw 7vw

## Stay in touch
* Author - [Yassir Mounsif](https://x.com/Yassir_Mounsif)

## License
This plugin is [MIT Licensed](LICENSE)

[1]: https://github.com/SalesforceCommerceCloud/storefront-reference-architecture/tree/master

## Disclaimer
This project is maintained by the Salesforce Community. Salesforce Commerce Cloud or Salesforce Platform Technical Support do not support this project or its setup...

For feature requests or bugs, please open a GitHub issue. Contributions are ALWAYS WELCOME -- and they benefit the broader community.
