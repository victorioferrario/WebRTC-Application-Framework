# Welcome
The current repository is the third refactoring of this library. I have spent some time genericising the structure, and namespaces to ensure max reusiblity.

The main entry point of the application begins @ <a href="https://github.com/vmfdesign/openTok3/blob/master/src/views/page.ts">src/views/page.ts</a>

## Service structure
> I take any sort of module, and I break it up into logical parts.  For instance, any sophisticated module will consist of properties, both public and private.  They will also have an arry of methods. And not to mention, an entry point for the UI.

Whether it id C# or TypeScript, I folllow this format.  In regards to the openTok integration, I have broken down functionality into the following classes:

1) <a href="https://github.com/vmfdesign/openTok3/blob/master/src/services/base.ts">openTok.Base</A>
2) <a href="https://github.com/vmfdesign/openTok3/blob/master/src/services/handler.ts">openTok.Handler</A>
3) <a href="https://github.com/vmfdesign/openTok3/blob/master/src/services/provider.ts">openTok.Provider</A>



### Inheritence is a thing
yes
