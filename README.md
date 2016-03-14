# UseTS.PL AdminBOT
### Our Teamspeak3 server https://usets.pl

UseTS-AdminBOT is multifunctional bot script in ECMAScript 5 (JavaScript) to use with www.sinusbot.com

  - Support channels with many automatic functions.
    - All staff members will be informed about user waiting.
    - User will get notification that staff was informed.
    - After specific time in settings user will be informed that staff is away if no one of them take help action.
    - If any staff user will go to help user rest of them will get information about that.
  - Support channel with automatic name + online staff members information.
  - Automatic temporary channels secure system by user joining specific channels.
  - Bots with AI so you can talk with them!
  - Welcome message send by bot if user do not have specific register group.
  - Users Online automatic channel.
  - Max Users Online automatic channel.
  - Users tracking system.
  - Channels activity logging system.
  
##### Commands
 By Private Chat to Bot
 - info - Currently channel activity last 50 records*1
 - info server - Joins/Disconnects last 50 records to server*1
 - info ID - Specific channel by ID last 50 records*1
 
Permissions
*1 only Help Groups

> Script is under development so please report an issues on Bug Tracker. 

##### Ideas and bugs reports here https://github.com/sync667/UseTS-AdminBOT/issues 

### Teamspeak Privileges Required
- Client>Basics
- Client>Admin>Move
- Channel>Information
- Channel>Create
- Channel>Modify
- Channel>Delete
- Channel>Access
- Group>Information

### Version
0.1.1

### Installation
You need Sinusbot installed:
```
1. Download UseTSAdminBOT.js and place it in scripts folder.
2. Restart Sinusbot.
3. Go to Scripts TAB enable and set all settings for script.
That's it!
```
### Development

Want to contribute? Great!

Just make sure you're using latest version of Sinusbot and make Pull Request with your code.

### TODOs

- https://forum.sinusbot.com/threads/request-close-channels.1225/
- Support channels can have special description about admins or special channel can have that one. (soon*)
- Auto add user to specific group joining specific channel.
- Better defaults setting handling.
- Bot flood check.
- Implement bot api over php only.
- Message when bot is busy.
- Handle player nick by ts function that will give possibility to just click it.
- Welcome user with some info maybe stats.
- Groups who can get auto temp channel.
- Check if there are any channels with inactive date some of period.
- Channel staff info auto update. (soon*)
- Bot lang setting.
- Social media integrator.
- Google Analytics reporting functions.
- Auto sub functions for streamers and yt. (soon*)
- Data access by Web API not send by request. (in progress)
- Staff reactions for help statistics.
- Nicks changes logging. (soon*)
- Channel creation, update or delete logging.
- Recording start/stop logging.
- Recording in all channels or specific one is denied.
- Move AFK user.
- Channels names restrictions.
- Bot help menu.
- Better scripts settings reloading handling.

(soon*) because of waiting for new functions in next Sinusbot version

License
----

GNU GPL-3
http://www.gnu.org/licenses/