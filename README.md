# UseTS.PL AdminBOT
### Our Teamspeak3 server https://usets.pl

UseTS-AdminBOT is multifunctional bot script in ECMAScript 5 (JavaScript) to use with www.sinusbot.com

  - Support channels with many automatic functions.
    - All staff members will be informed about user waiting.
    - User will get notification that staff was informed.
    - After specific time in settings user will be informed that staff is away if no one of them take help action.
    - If any staff user will go to help user rest of them will get information about that.
    - Handling staff away mode. (it's little tricky because user after set away mode have to change channel, sinusbot don't have event to handle that better)
  - Support channel with automatic name + online staff members information.
  - Automatic temporary channels secure system by user joining specific channels.
  - Welcome message send by bot if user do not have specific register group.
  - Users Online automatic channel.
  - Max Users Online automatic channel with date.
  - Users tracking system.
  - Channels activity logging system.
  - Automatic codec and quality change when bot joins channel and set it back after leave.
  - Automatic support channels closed prefix and maxClient to 0 when no staff is online.
  - Staff channel with sub-channel list + description
  - Simple one line clock that can be formatted by own
  
##### Commands
 By Private Chat to Bot
 - info - Currently channel activity last 50 records*1
 - info server - Joins/Disconnects last 50 records to server*1
 - info all - Currently channel full logged activity*1
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

### Installation
You need Sinusbot installed:
```
1. Download UseTSAdminBOT.js and place it in scripts folder.
2. Restart Sinusbot.
3. Go to Scripts TAB enable and set all settings for script. (if you want use default messages templates just leave like they are in form)
That's it!
```
### Development

Want to contribute? Great!

Just make sure you're using latest version of Sinusbot and make Pull Request with your code.

### TODOs

- Auto add user to specific group joining specific channel.
- Welcome user with some info maybe stats.
- Check if there are any channels with inactive date some of period.
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
- Script full page for management and settings.
- Advanced experience system.

(soon*) because of waiting for new functions in next Sinusbot version

License
----

GNU GPL-3
http://www.gnu.org/licenses/