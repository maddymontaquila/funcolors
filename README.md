# Welcome to Fun Colors!

APPARENTLY you can't just add new named colors to .NET MAUI. But who can remember the elusive hex code of .NET's brand purple or the light blue of the old Xamagon? Not me!

Current Colors:
`DotNetPurple2024` (#512BD4)
`XamarinBlue2011` (#5596D8)

To use this library, just add `using FunColors;` to your file (preferably your global usings, because we're modern here). Then, you can set the color anywhere using `FunColor.DotNetPurple2024` etc. You can also add `using static FunColors.FunColor;` if you want to type just the color name `DotNetPurple2024`.

If you want to use it in XAML, add `xmlns:fun="clr-namespace:FunColors;assembly=FunColors"` to your file, then reference the colors using `color={x:Static fun:FunColor.DotNetPurple2024}`. It would be prettier if you did this in your Colors.xaml and just used whatever pretty name you give it throughout!

