# Monica 

![logo](/doc/monica.png?raw=true "scheduling")


Always looking forward for a opportunity to clean something =)


## Built With

* [Node.Js (v10.x.x)](https://nodejs.org/en/)
* [React Native](https://github.com/facebook/react-native)
* [React Navigation](https://github.com/react-navigation/react-navigation)

## Architecture

![grafic](/doc/architecture.png)

*To edit use https://www.draw.io/ and open docs/architecture.xml*

## How to Install

- **Prerequisites**
  - NodeJs: **v10.11.+**
  - Android SDK Plataform:
    - Android 6.0 (Marshmallow) **v23**
    - Google API **23**
    - Sources for Android **23**
    - Intel x86 Atom_64 System Image **23**
    - Google API Intel x86 Atom_64 System Image **23**
  - Android SDK Tools: 
    - Android SDK Build-Tools
    - Android Emulator **27.3.10**
    - Android SKD Plataform-Tools **28.0.1**
    - Android SDK Tools **26.1.1**
    - Intel x86 Emulator Accelerator (HAXM installer) **7.3.2**
    - Support Repository
  - Setup React-Native: https://facebook.github.io/react-native/docs/getting-started.html

- **Install modules**

```bash
$ make install
```

## How to Test

```bash
$ make utest
```

## How to Run

*Android*

```bash
$ make radd
```
*iOS*

```bash
$ make rios
```