//
//Copyright (C) 2016 sync667 <kontakt@usets.pl>
//
//This program is free software: you can redistribute it and/or modify
//it under the terms of the GNU General Public License as published by
//the Free Software Foundation, either version 3 of the License, or
//(at your option) any later version.
//*
//This program is distributed in the hope that it will be useful,
//but WITHOUT ANY WARRANTY; without even the implied warranty of
//MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
//GNU General Public License for more details.
//
//You should have received a copy of the GNU General Public License
//along with this program.  If not, see <http://www.gnu.org/licenses/>.
//
//Author of Script: sync667 <kontakt@usets.pl>
//

registerPlugin(
    {
        name: 'UseTS-AdminBOT',
        version: '0.3.5',
        description: 'Many administration functions in one plugin.',
        author: 'sync667',
        vars: {
            helpChannelsId: { title: 'Support Channels - IDs (comma separated)', type: 'string' },
            helpGroupsId: { title: 'Support Members - GroupsID (comma separated)', type: 'string' },
            helpIgnoredGroupsId: { title: 'Group ignored on support channels - GroupsID (comma separated)', type: 'string' },
            helpCloseNoStaff: {title: 'Should support channels should be closed when no staff online?', type: 'select',
                options: ['Yes', 'No']},
            helpAwayMode: {title: 'Should staff with away status be excluded from online support?', type: 'select',
                options: ['Yes', 'No']},
            helpClosePrefix: {title: 'Prefix added to channel name when closed (must be short, because of chars limit)', type: 'string',
                placeholder: '(Closed)'},
            helpUserNotification: {title: 'Message to user waiting support - s0 for Username, s1 for Staff Online', type: 'string',
                placeholder: 'Hi [b]s0[/b]! Staff member will help you soon! [b]Online staff:[/b] s1'},
            helpUserNotification2: {title: 'Message to user when no staff online - s0 for Username', type: 'string',
                placeholder: 'Hi [b]s0[/b]! Sorry, but all our staff is offline come back later.'},
            helpStaffNotification: {title: 'Message to staff - s0 for Username, s1 for Staff Online', type: 'string',
                placeholder: 'User [b]s0[/b] is waiting in support zone! [b]Online staff:[/b] s1'},
            helpStaffAway: {title: 'Message to user after Staff Away Time passed about staff currently busy', type: 'string',
                placeholder: 'Sorry! Our staff is currently busy. They will contact you as soon as possible.'},
            helpStaffAwayTime: {title: 'Timer after with user will get notification about staff is busy right now in seconds (0 to disable)', type: 'number',
                placeholder: 'Default 60 seconds'},
            helpStaffJoined: {title: 'Message to staff when someone of them join to help user - s0 for Username of helper, s1 for Username of user', type: 'string',
                placeholder: 'Staff member [b]s0[/b] joined to help [b]s1[/b].'},
            helpStaffNotificationType: {title: 'Support (staff users) notification type', type: 'select',
                options: ['Chat','Poke']},
            helpUsersNotificationType: {title: 'Support (normal users) notification type', type: 'select',
                options: ['Chat','Poke']},
            autoTempChannelsId: {title: 'Auto temporary channels (comma separated)', type: 'string' },
            autoTempChannelsParentId: {title: 'Auto temporary channels parent', type: 'channel' },
            autoTempChannelsRestrictedGroups: {title: 'Groups that are not allowed to get temporary channels - IDs (comma separated)', type: 'string'},
            autoTempChannelsName: {title: 'Automatic temporary channel name - s0 is channel number', type: 'string',
                placeholder: 'Temporary Channel s0'},
            autoTempChannelsMessage: {title: 'Message to user about auto temporary chanel get created', type: 'string',
                placeholder: 'I created temporary channel as you wish!'},
            autoTempChannelsPassMessage: {title: 'Message to user about auto temporary chanel password - s0 is password', type: 'string',
                placeholder: 'Your channel password: [b]s0[/b]'},
            autoTempChannelsPass: {title: 'Automatic temporary channels with password?', type: 'select',
                options: ['Yes', 'No']},
            autoTempChannelsPassLength: {title: 'Automatic temporary channel password length', type: 'number',
                placeholder: '4'},
            autoTempChannelsRestricted: {title: 'Message when users is not permitted do get temporary channel', type: 'string',
                placeholder: 'Sorry! You are not allowed to get temporary channel.'},
            autoTempChannelsErrorMessage: {title: 'Message to user about auto temp channel creation error', type: 'string',
                placeholder: "I can't created temporary channel for you right now, try later."},
            botChecksEvery: {title: 'Every x seconds bot will do checks (optimal is 60)', type: 'number'},
            botAIPrivateChat: {title: 'Should bot use his AI to replay for private chat messages to user?', type: 'select',
                options: ['Yes', 'No']},
            botAIPoke: {title: 'Should bot use his AI to replay for poke messages to user?', type: 'select',
                options: ['Yes', 'No']},
            onlineUsersChannelId: {title: 'Channel with name update for online users information', type: 'channel'},
            onlineUsersChannel: {title: 'Name of auto online channel - s0 is online number', type: 'string',
                placeholder: "Users Online: s0"},
            maxOnlineUsersChannelId: {title: 'Channel with name update for max online users information', type: 'channel'},
            maxOnlineUsersChannel: {title: 'Name of auto max online channel - s0 is for max online number', type: 'string',
                placeholder: "Max Users Online: s0"},
            staffOnlineChannelId: {title: 'Channel with name update for staff online information', type: 'channel'},
            staffOnlineChannelName: {title: 'Name of staff online channel - s0 is online number', type: 'string',
                placeholder: "Staff Online: s0"},
            registerGroupId: {title: 'Registration Group Id', type: 'number'},
            registerWelcomeMessage: {title: 'Welcome message for user without register group', type: 'multiline'},
            registerMessageType: {title: 'Type of message poke or chat', type: 'select',
                options: ['Poke', 'Chat']},
            registerMessageOn: {title: 'Turn on or off welcome message poke or chat', type: 'select',
                options: ['On', 'Off']},
            autoMusicCodecBot: {title: 'Change codec of channel to music when bot joins?', type: 'select',
                options: ['On', 'Off']},
            autoMusicCodecNew: {title: 'Codec and quality to set on channel with bot joins - syntax: "codecId#quality", example for opus music "5#10"', type: 'string',
                placeholder: '5#10'}
        }
    },
    function(sinusbot, config, info) {
        sinusbot.log('Loading ' + info.name + ' version: ' + info.version + '  - powered by ' + info.author);
        sinusbot.log('Do not forget to check all settings!');

        sinusbot.setVar('staff', []);
        sinusbot.setVar('onChannelCreate', []);
        sinusbot.setVar('onlineClients', 1);
        sinusbot.setVar('usersOnHelp', []);
        sinusbot.setVar('channelCodec', []);
        sinusbot.setVar('botMove' + self, {});
        sinusbot.setVar("helpClosed", 0);

        var self = sinusbot.getBotId();
        var staff = sinusbot.getVar('staff');

        //Defaults values handling
        if (isUndefined(config.helpChannelsId))
            config.helpChannelsId = -1;
        if (isUndefined(config.helpGroupsId))
            config.helpGroupsId = -1;
        if (isUndefined(config.helpIgnoredGroupsId))
            config.helpIgnoredGroupsId = -1;
        if (isUndefined(config.helpStaffAwayTime) || config.helpStaffAwayTime < 0)
            config.helpStaffAwayTime = 60;
        if (isUndefined(config.autoTempChannelsId))
            config.autoTempChannelsId = -1;
        if (isUndefined(config.autoTempChannelsParentId) || parseInt(config.autoTempChannelsParentId) < 0)
            config.autoTempChannelsParentId = 0;
        if (isUndefined(config.autoTempChannelsRestrictedGroups))
            config.autoTempChannelsRestrictedGroups = -1;
        if (isUndefined(config.autoTempChannelsPass))
            config.autoTempChannelsPass = 1;
        if (isUndefined(config.autoTempChannelsPassLength) || config.autoTempChannelsPassLength < 0)
            config.autoTempChannelsPassLength = 4;
        if (isUndefined(config.helpStaffAwayTime) || config.helpStaffAwayTime < 0)
            config.helpStaffAwayTime = 60;
        if (isUndefined(config.botChecksEvery) || config.botChecksEvery < 0)
            config.botChecksEvery = 60;
        if (isUndefined(config.helpCloseNoStaff))
            config.helpCloseNoStaff = 1;
        if (isUndefined(config.helpAwayMode))
            config.helpAwayMode = 1;
        if (isUndefined(config.helpStaffNotificationType))
            config.helpStaffNotificationType = 0;
        if (isUndefined(config.helpUsersNotificationType))
            config.helpUsersNotificationType = 0;
        if (isUndefined(config.botAIPrivateChat))
            config.botAIPrivateChat = 1;
        if (isUndefined(config.botAIPoke))
            config.botAIPoke = 1;
        if (isUndefined(config.registerMessageType))
            config.registerMessageType = 1;
        if (isUndefined(config.registerMessageOn))
            config.registerMessageOn = 1;
        if (isUndefined(config.autoMusicCodecBot))
            config.autoMusicCodecBot = 1;
        if (isUndefined(sinusbot.getVar("maxOnlineRecord")))
            sinusbot.setVar("maxOnlineRecord", 0);
        if (isUndefined(sinusbot.getVar("tempChannels")))
            sinusbot.setVar("tempChannels", []);
        if (isUndefined(config.helpClosePrefix))
            config.helpClosePrefix = "(Closed)";
        if (isUndefined(config.helpUserNotification))
            config.helpUserNotification = "Hi [b]s0[/b]! Staff member will help you soon! [b]Online staff:[/b] s1";
        if (isUndefined(config.helpUserNotification2))
            config.helpUserNotification2 = "Hi [b]s0[/b]! Sorry, but all our staff is offline come back later.";
        if (isUndefined(config.helpStaffNotification))
            config.helpStaffNotification = "User [b]s0[/b] is waiting in support zone! [b]Online staff:[/b] s1";
        if (isUndefined(config.helpStaffAway))
            config.helpStaffAway = "Sorry! Our staff is currently busy. They will contact you as soon as possible.";
        if (isUndefined(config.helpStaffJoined))
            config.helpStaffJoined = "Staff member [b]s0[/b] joined to help [b]s1[/b].";
        if (isUndefined(config.autoTempChannelsName))
            config.autoTempChannelsName = "Temporary Channel s0";
        if (isUndefined(config.autoTempChannelsMessage))
            config.autoTempChannelsMessage = "I created temporary channel as you wish!";
        if (isUndefined(config.autoTempChannelsPassMessage))
            config.autoTempChannelsPassMessage = "Your channel password: [b]s0[/b]";
        if (isUndefined(config.autoTempChannelsRestricted))
            config.autoTempChannelsRestricted = "Sorry! You are not allowed to get temporary channel.";
        if (isUndefined(config.autoTempChannelsErrorMessage))
            config.autoTempChannelsErrorMessage = "I can't created temporary channel for you right now, try later.";
        if (isUndefined(config.onlineUsersChannel))
            config.onlineUsersChannel = "Users Online: s0";
        if (isUndefined(config.maxOnlineUsersChannel))
            config.maxOnlineUsersChannel = "Max Users Online: s0";
        if (isUndefined(config.staffOnlineChannelName))
            config.staffOnlineChannelName = "Staff Online: s0";
        if (isUndefined(config.autoMusicCodecNew))
            config.autoMusicCodecNew = '5#10';

        try {
            var helpChannelsId = config.helpChannelsId.toString().split(',');
            var helpGroupsId = config.helpGroupsId.toString().split(',');
            var helpIgnoredGroupsId = config.helpIgnoredGroupsId.toString().split(',');
            var autoTempChannelsId = config.autoTempChannelsId.toString().split(',');
            var autoTempChannelsRestrictedGroups = config.autoTempChannelsRestrictedGroups.toString().split(',');
            var autoMusicCodecNew = config.autoMusicCodecNew.toString().split('#');
        } catch (e) {
            sinusbot.log('Your configuration is wrong! Check if you typed correct values.');
            sinusbot.log('START - Error code: ' + e);
            sinusbot.log('Line: ' + e.lineNumber + ' Column: ' + e.columnNumber);
            sinusbot.log('Setting1: ' + config.helpChannelsId);
            sinusbot.log('Setting2: ' + config.helpGroupsId);
            sinusbot.log('Setting3: ' + config.helpIgnoredGroupsId);
            sinusbot.log('Setting4: ' + config.autoTempChannelsId);
            sinusbot.log('Setting5: ' + config.autoTempChannelsRestrictedGroups);
            sinusbot.log('Setting6: ' + config.autoMusicCodecNew);
            sinusbot.log('END ---------------------- END');

            //Temp again defaults
            helpChannelsId = -1;
            helpGroupsId = -1;
            helpIgnoredGroupsId = -1;
            autoTempChannelsId = -1;
            autoTempChannelsRestrictedGroups = -1;
            autoMusicCodecNew = [5,10];
        }

        /*
         Support Channels auto poke function event section
         */
        sinusbot.on('clientMove', function (e) {
            var isStaff = haveGroupFromArray(e, helpGroupsId);
            var isHelpClosed = sinusbot.getVar('helpClosed');
            var isIgnored = haveGroupFromArray(e, helpIgnoredGroupsId);
            var staff = sinusbot.getVar('staff');
            var usersOnHelp = sinusbot.getVar('usersOnHelp');

            if(config.helpAwayMode == 0 && e.client.away == 1)
                isStaff = false;

            if (isStaff) {
                if (staff.indexOf(e.clientId) == -1) {
                    staff.push(e.clientId);
                }
            } else if (staff.indexOf(e.clientId) >= 0) {
                staff = removeFromArray(staff, e.clientId);
            }

            for (var i = 0; i < staff.length; i++) {
                var clientId = staff[i];

                if (getUserChannelId(clientId) == 0) {
                    staff = removeFromArray(staff, clientId);
                }
            }

            if(config.helpCloseNoStaff == 0) {
                if (staff.length == 0 && isHelpClosed == 0) {
                    for (var i = 0; i < helpChannelsId.length; i++) {
                        var channel = getChannelParams(parseInt(helpChannelsId[i]));
                        if (channel == false)
                            continue;
                        var newName = config.helpClosePrefix + channel.name;
                        channelUpdate(channel.id, {name: newName, maxClients: 0});
                    }
                    sinusbot.setVar('helpClosed', 1);
                } else if (staff.length > 0 && isHelpClosed == 1) {
                    for (var i = 0; i < helpChannelsId.length; i++) {
                        var channel = getChannelParams(parseInt(helpChannelsId[i]));
                        if (channel == false)
                            continue;
                        var newName = channel.name.substring(config.helpClosePrefix.length);
                        channelUpdate(channel.id, {name: newName, maxClients: -1});
                    }
                    sinusbot.setVar('helpClosed', 0);
                }
            }

            sinusbot.setVar('staff', staff);

            if (isChannelInArray(e.newChannel, helpChannelsId)) {
                if (isIgnored == false) {
                    if (isUndefined(staff) || staff.length <= 0) {
                        sendUserNotification(config.helpUsersNotificationType, e.clientId, replaceSNVariables(config.helpUserNotification2, e.clientNick));
                        usersOnHelp.push({
                            clientId: e.clientId,
                            clientUid: e.clientUid,
                            clientNick: e.clientNick,
                            newChannel: e.newChannel,
                            oldChannel: e.oldChannel,
                            action: 1,
                            staffReaction: false
                        });
                    } else {
                        staff.forEach(function (staffClientId) {
                            var message = replaceSNVariables(config.helpStaffNotification, e.clientNick, staff.length);
                            if (config.helpStaffNotificationType == 0) {
                                message = replaceSNVariables(
                                    config.helpStaffNotification,
                                    '[URL=client://0/' + e.clientUid + ']' + e.clientNick + '[/URL]',
                                    staff.length
                                );
                            }
                            sendUserNotification(config.helpStaffNotificationType, staffClientId, message);
                        });
                        sendUserNotification(config.helpUsersNotificationType, e.clientId, replaceSNVariables(config.helpUserNotification, e.clientNick, staff.length));
                        usersOnHelp.push({
                            clientId: e.clientId,
                            clientUid: e.clientUid,
                            clientNick: e.clientNick,
                            newChannel: e.newChannel,
                            oldChannel: e.oldChannel,
                            action: 2,
                            staffReaction: false
                        });
                        if (config.helpStaffAwayTime > 0) {
                            setTimeout(function () {
                                var userOnHelpF = sinusbot.getVar('usersOnHelp');
                                for (var i = 0; i < userOnHelpF.length; i++) {
                                    var user = userOnHelpF[i];
                                    if (user.clientId == e.clientId && user.staffReaction != true) {
                                        sendUserNotification(config.helpUsersNotificationType, e.clientId, config.helpStaffAway);
                                    }
                                }
                            }, 1000 * config.helpStaffAwayTime);
                        }
                    }
                    sinusbot.setVar('usersOnHelp', usersOnHelp);

                } else {
                    for (var i = 0; i < usersOnHelp.length; i++) {
                        var user = usersOnHelp[i];
                        if (user.newChannel == e.newChannel && user.staffReaction != true) {
                            staff.forEach(function (staffClientId) {
                                if (staffClientId != e.clientId) {
                                    var message = replaceSNVariables(config.helpStaffJoined, e.clientNick, user.clientNick);
                                    if (config.helpStaffNotificationType == 0) {
                                        message = replaceSNVariables(
                                            config.helpStaffJoined,
                                            '[URL=client://0/' + e.clientUid + ']' + e.clientNick + '[/URL]',
                                            '[URL=client://0/' + user.clientUid + ']' + user.clientNick + '[/URL]'
                                        );
                                    }
                                    sendUserNotification(config.helpStaffNotificationType, staffClientId, message);
                                }
                            });
                            user.staffReaction = true;
                            usersOnHelp[i] = user;
                        }
                    }
                    sinusbot.setVar('usersOnHelp', usersOnHelp);
                }
            } else if (isChannelInArray(e.oldChannel, helpChannelsId)) {
                if (isIgnored == false) {
                    for (var i = 0; i > usersOnHelp.length; i++) {
                        var user = usersOnHelp[i];
                        if (user.clientId == e.clientId && user.oldChannel == e.oldChannel) {
                            removeFromArray(usersOnHelp, user);
                        }
                    }
                    sinusbot.setVar('usersOnHelp', usersOnHelp);
                }
            }

        });
        /*
         //END Support Channels auto poke function section //END
         */

        /*
         Automatic temporary channel events section
         */
        sinusbot.on('clientMove', function (e) {
            if (isChannelInArray(e.newChannel, autoTempChannelsId)) {
                if (!haveGroupFromArray(e, autoTempChannelsRestrictedGroups)) {
                    var autoTempChannelParentId = parseInt(config.autoTempChannelsParentId);
                    var channelName = config.autoTempChannelsName;
                    var channelPassword = randomString(config.autoTempChannelsPassLength, '#');

                    for (var i = 1; i <= 1000; i++) {
                        var tempChannelName = replaceSNVariables(channelName, i);

                        if (getChannelId(tempChannelName, autoTempChannelParentId) == false) {
                            channelName = tempChannelName;
                            break;
                        }
                    }

                    var channel = {
                        name: channelName,
                        parent: autoTempChannelParentId,
                        password: channelPassword,
                        topic: e.clientNick,
                        enc: 1,
                        perm: 0,
                        sperm: 1,
                        default: 0
                    };

                    var channelCreated = {
                        channelName: channelName,
                        channelParentId: autoTempChannelParentId,
                        creator: e,
                        password: channelPassword
                    };

                    if(config.autoTempChannelsPass == 1) {
                        channel.password = '';
                        channelCreated.password = '';
                    }

                    channelCreate(channel);

                    var onChannelCreate = sinusbot.getVar("onChannelCreate");

                    if (!isUndefined(onChannelCreate) || onChannelCreate.indexOf(channelCreated) == -1) {
                        onChannelCreate.push(channelCreated);
                        sinusbot.setVar("onChannelCreate", onChannelCreate);
                    } else {
                        sinusbot.log('Something goes wrong when adding you new channel to event list checks!');
                    }
                } else {
                    chatPrivate(e.clientId, config.autoTempChannelsRestricted);
                }
            }
        });

        sinusbot.on('channelCreate', function (channel) {
            var onChannelCreate = sinusbot.getVar("onChannelCreate");

            for (var i = 0; i < onChannelCreate.length; i++) {
                if (onChannelCreate[i].channelName == channel.name && onChannelCreate[i].channelParentId == channel.parent) {
                    if (channel.id > 0) {
                        var tempChannels = sinusbot.getVar("tempChannels");

                        sinusbot.log('Temp channel ' + channel.name + ' ID: ' + channel.id + ' was created by ' + onChannelCreate[i].creator.clientId + "@" + onChannelCreate[i].creator.clientNick);
                        tempChannels.push(channel.id);
                        sinusbot.setVar("tempChannels", tempChannels);
                        move(onChannelCreate[i].creator.clientId, channel.id);
                        chatPrivate(onChannelCreate[i].creator.clientId, config.autoTempChannelsMessage);
                        if(config.autoTempChannelsPass == 0) {
                            chatPrivate(onChannelCreate[i].creator.clientId, replaceSNVariables(config.autoTempChannelsPassMessage, onChannelCreate[i].password));
                        }
                    } else {
                        sinusbot.log('Something goes wrong when creating auto temp channel! ' + channel.id);
                        chatPrivate(onChannelCreate[i].creator.clientId, config.autoTempChannelsErrorMessage);
                    }

                    onChannelCreate.splice(i, 1);
                    sinusbot.setVar("onChannelCreate", onChannelCreate);
                    break;
                }
            }
        });

        /*
         Timer checks event
         */
        setInterval(function () {
            //Temporary channels inactive deleting
            var tempChannels = sinusbot.getVar("tempChannels");

            for (var i = 0; i < tempChannels.length; i++) {
                if (getClientsNumber(tempChannels[i]) == 0) {
                    channelDelete(tempChannels[i], true);
                    sinusbot.log('Temp channel ' + tempChannels[i] + ' was deleted by check timer.');
                    tempChannels.splice(i, 1);
                }
            }
            sinusbot.setVar("tempChannels", tempChannels);

        }, 1000 * config.botChecksEvery);

        /*
         Bot AI and commands, event for chat
         */
        sinusbot.on('chat', function (chat) {
            if (config.botAIPrivateChat == 0 && chat.mode == 1 && getNick() != chat.clientNick) {
                var check = true;
                if (new RegExp('info [0-9]+').test(chat.msg) || chat.msg == 'info' || chat.msg == 'info server' || chat.msg == 'info all') {
                    if (haveGroupOnServer(chat, helpGroupsId)) {
                        check = false;
                    }
                }
                if (check) {
                    var options = {
                        method: "GET",
                        headers: "Content-type: text/html; charset=utf-8",
                        timeout: 15000,
                        url: "https://usets.pl/bot.php?msg=" + chat.msg
                    };
                    http(options, function (error, response) {
                        if (error == null && response != null && response.statusCode == 200) {
                            chatPrivate(chat.clientId, response.data);
                        } else if (response != null) {
                            sinusbot.log('Problem with your bot chat! ' + response.statusCode + "-" + typeof(response.statusCode) + "-" + typeof(200));
                        } else {
                            sinusbot.log('Problem with your bot chat! ' + error);
                        }
                    });
                }
            }
        });

        /*
         Bot AI and commands, event for poke
         */
        sinusbot.on('poke', function (message) {
            if (config.botAIPoke == 0 && getNick() != message.clientNick) {
                var options = {
                    method: "GET",
                    headers: "Content-type: text/html; charset=utf-8",
                    timeout: 15000, url: "https://usets.pl/bot.php?msg=" + message.msg
                };
                http(options, function (error, response) {
                    if (error == null && response != null && response.statusCode == 200) {
                        poke(message.clientId, response.data);
                    } else if (response != null) {
                        sinusbot.log('Problem with your bot poke! ' + response.statusCode + "-" + typeof(response.statusCode) + "-" + typeof(200));
                    } else {
                        sinusbot.log('Problem with your bot poke! ' + error);
                    }
                });
            }
        });

        /*
         Welcome poke information event
         */
        sinusbot.on('clientMove', function (e) {
            if (e.oldChannel == 0 && config.registerMessageOn == 0) {
                var isNew = !haveGroupOnServer(e, parseInt(config.registerGroupId));

                if (isNew && !haveGroupFromArray(e, helpGroupsId)) {
                    var message = config.registerWelcomeMessage;
                    if (config.registerMessageType == 0) {
                        poke(e.clientId, message);
                    } else {
                        chatPrivate(e.clientId, message);
                    }
                }
            }
        });

        /*
         Information event for online users channel updates and max online record
         */
        sinusbot.on('clientMove', function (e) {
            if (e.oldChannel == 0 || e.newChannel == 0) {
                var clients = getClientsNumber();
                onlineClientsChannel(clients);
                sinusbot.setVar("onlineClients", clients);

                if (sinusbot.getVar("maxOnlineRecord") < clients) {
                    maxOnlineClientsChannel(clients);
                    sinusbot.setVar("maxOnlineRecord", clients);
                }
            }

            //Staff Groups bypass
            if (haveGroupFromArray(e, helpGroupsId)) {
                staffOnlineChannel(sinusbot.getVar('staff').length);
            }
        });

        /*
         Logging event to track channels users activity
         */
        sinusbot.on('clientMove', function (e) {
            var timeNow = new Date().getTime();
            var channelLogNewChannel = [];
            var channelLogOldChannel = [];
            var entryTypeOld = 0;
            var entryTypeNew = 0;

            if (isUndefined(sinusbot.getVar(e.newChannel))) {
                channelLogNewChannel = [];
                entryTypeNew = (e.newChannel == 0) ? 3 : 1;
                channelLogNewChannel.push([timeNow, e.clientUid, e.clientNick, e.oldChannel, e.newChannel, entryTypeNew]);
                sinusbot.setVar(e.newChannel, channelLogNewChannel);
            } else {
                channelLogNewChannel = sinusbot.getVar(e.newChannel);
                entryTypeNew = (e.newChannel == 0) ? 3 : 1;
                channelLogNewChannel.push([timeNow, e.clientUid, e.clientNick, e.oldChannel, e.newChannel, entryTypeNew]);
                sinusbot.setVar(e.newChannel, channelLogNewChannel);
            }

            if (isUndefined(sinusbot.getVar(e.oldChannel))) {
                channelLogOldChannel = [];
                entryTypeOld = (e.oldChannel == 0) ? 4 : 2;
                channelLogOldChannel.push([timeNow, e.clientUid, e.clientNick, e.oldChannel, e.newChannel, entryTypeOld]);
                sinusbot.setVar(e.oldChannel, channelLogOldChannel);
            } else {
                channelLogOldChannel = sinusbot.getVar(e.oldChannel);
                entryTypeOld = (e.oldChannel == 0) ? 4 : 2;
                channelLogOldChannel.push([timeNow, e.clientUid, e.clientNick, e.oldChannel, e.newChannel, entryTypeOld]);
                sinusbot.setVar(e.oldChannel, channelLogOldChannel);
            }
        });

        /*
         Logging event to clear channel log activity on channel delete
         */
        sinusbot.on('channelDelete', function (channel) {
            sinusbot.unsetVar(channel.id.toString());
        });

        /*
         Command event for getting channel activity log
         */
        sinusbot.on('chat', function (chat) {
            if (getNick() != chat.clientNick && chat.mode == 1 && haveGroupFromArray(chat, helpGroupsId)) {
                if (chat.msg == 'info' || chat.msg == 'info server' || chat.msg == 'info all' || new RegExp('info [0-9]+').test(chat.msg)) {
                    if (chat.msg == 'info' || chat.msg == 'info all') {
                        var channelLog = sinusbot.getVar(chat.channel);
                    } else if (new RegExp('info [0-9]+').test(chat.msg)) {
                        var channelLog = sinusbot.getVar(parseInt(chat.msg.split(' ')[1]));
                    } else if (chat.msg == 'info server') {
                        var channelLog = sinusbot.getVar(0);
                    }

                    if (isUndefined(channelLog) || channelLog.length <= 0) {
                        chatPrivate(chat.clientId, 'No entry logs for this channel!');
                    } else {
                        if (channelLog.length < 50) {
                            var history = 0;
                        } else {
                            if(chat.msg == 'info all') {
                                var history = 0;
                            } else {
                                var history = channelLog.length - 50;
                            }
                        }
                        for (var i = history; i < channelLog.length; i++) {
                            var logEntry = channelLog[i];
                            var entryType = 'error';

                            switch (logEntry[5]) {
                                case 1:
                                    entryType = 'entered';
                                    break;
                                case 2:
                                    entryType = 'leaved';
                                    break;
                                case 3:
                                    entryType = 'disconnected from server';
                                    break;
                                case 4:
                                    entryType = 'joined to server';
                                    break;
                            }

                            chatPrivate(chat.clientId, 'Date: ' + new Date(logEntry[0]).toISOString() + '/ClientId: '
                                + logEntry[1] + '/ClientName: ' + logEntry[2] + '/OldChannel: '
                                + logEntry[3] + '/NewChannel: ' + logEntry[4] + '/' + entryType);
                        }
                        chatPrivate(chat.clientId, 'All records - ' + channelLog.length);
                    }
                }
            }
        });

        /*
         Web Data API Event
         */
        sinusbot.on('api:web', function (data) {
            return sinusbot.getVar('staff').length;
        });

        /*
         Event will handle bot joining to channel and change codec automatically if autoMusicCodecBot is On
         */
        sinusbot.on('botMove', function (info) {
            if (config.autoMusicCodecBot == 0) {
                var channelCodec = sinusbot.getVar('channelCodec');
                var botMove = sinusbot.getVar('botMove' + self);
                if (info.newChannel != 0) {
                    if (isEmpty(botMove)) {
                        botMove = {newChannel: info.newChannel, oldChannel: 0};
                    } else {
                        botMove = {newChannel: info.newChannel, oldChannel: botMove.newChannel};
                    }

                    var channel = getChannelParams(info.newChannel);
                    channelCodec.push({id: info.newChannel, codec: channel.codec, quality: channel.quality});
                    channelUpdate(info.newChannel, {
                        codec: parseInt(autoMusicCodecNew[0]),
                        quality: parseInt(autoMusicCodecNew[1])
                    });
                }
                if (botMove.oldChannel != 0) {
                    var codec = 4;
                    var quality = 6;
                    for (var i = 0; i < channelCodec.length; i++) {
                        if (channelCodec[i].id == botMove.oldChannel) {
                            codec = channelCodec[i].codec;
                            quality = channelCodec[i].quality;
                            break;
                        }
                    }
                    channelUpdate(botMove.oldChannel, {codec: codec, quality: quality});
                    channelCodec = removeFromArray(channelCodec, {
                        id: botMove.oldChannel,
                        codec: codec,
                        quality: quality
                    });
                }


                sinusbot.setVar('botMove' + self, botMove);
                sinusbot.setVar('channelCodec', channelCodec);
            }
        });

        /*
         Fix for staff array
         */
        sinusbot.on('clientServergroupAdd', function (client) {
            if (haveSpecificGroupFromArray(client.serverGroupId, helpGroupsId)) {
                var staff = sinusbot.getVar('staff');
                staff.push(client.clientId);
                sinusbot.setVar('staff', staff);
                staffOnlineChannel(sinusbot.getVar('staff').length);
            }
        });

        sinusbot.on('clientServergroupDel', function (client) {
            if (haveSpecificGroupFromArray(client.serverGroupId, helpGroupsId)) {
                sinusbot.setVar('staff', removeFromArray(sinusbot.getVar('staff'), client.clientId));
                staffOnlineChannel(sinusbot.getVar('staff').length);
            }
        });

        /*
         Update clients online information channel
         */
        function onlineClientsChannel(online) {
            if (!isUndefined(config.onlineUsersChannel) || !isUndefined(config.onlineUsersChannelId)) {
                var channel = getChannelParams(parseInt(config.onlineUsersChannelId));
                if (channel != false) {
                    channel.name = replaceSNVariables(config.onlineUsersChannel, online);
                    channelUpdate(channel.id, {name: channel.name});
                }
            }
        }

        /*
         Update max clients online information channel
         */
        function maxOnlineClientsChannel(maxOnline) {
            if (!isUndefined(config.maxOnlineUsersChannel) || !isUndefined(config.maxOnlineUsersChannelId)) {
                var channel = getChannelParams(parseInt(config.maxOnlineUsersChannelId));
                if (channel != false) {
                    channel.name = replaceSNVariables(config.maxOnlineUsersChannel, maxOnline);
                    channelUpdate(channel.id, {name: channel.name});
                }
            }
        }

        /*
         Update staff online information channel
         */
        function staffOnlineChannel(staffOnline) {
            if (!isUndefined(config.staffOnlineChannelName) || !isUndefined(config.staffOnlineChannelId)) {
                var channel = getChannelParams(parseInt(config.staffOnlineChannelId));
                if (channel != false) {
                    channel.name = replaceSNVariables(config.staffOnlineChannelName, staffOnline.toString());
                    channelUpdate(channel.id, {name: channel.name});
                }
            }
        }

        /*
         Function with will send notification poke or chat message
         */
        function sendUserNotification(notificationType, user, message) {
            if (notificationType == 0)
                chatPrivate(user, message);
            else if (notificationType == 1)
                poke(user, message);
        }

        /*
         If user have specific group in client server groups array
         */
        function haveGroupOnServer(e, group) {
            if (typeof(group) != 'number') {
                group = parseInt(group);
            }

            var result = false;
            for (var i = 0; i < e.clientServerGroups.length; i++) {
                if (e.clientServerGroups[i].i == group) {
                    result = true;
                    break;
                }
            }

            return result;
        }

        /*
         If user have specific group of clientServerGroups from input array
         */
        function haveGroupFromArray(e, arrayGroups) {
            var result = false;

            for (var i = 0; i < arrayGroups.length; i++) {
                var group = arrayGroups[i];
                if (typeof(group) != 'number') {
                    group = parseInt(group);
                }
                if (haveGroupOnServer(e, group)) {
                    result = true;
                    break;
                }
            }

            return result;
        }

        /*
         If user have specific group from input array
         */
        function haveSpecificGroupFromArray(groupId, arrayGroups) {
            var result = false;
            for (var i = 0; i < arrayGroups.length; i++) {
                var group = arrayGroups[i];
                if (typeof(group) != 'number') {
                    group = parseInt(group);
                }

                if (groupId == group) {
                    result = true;
                    break;
                }
            }

            return result;
        }

        /*
         Generate random hash with specific length and chars selected
         */
        function randomString(length, chars) {
            var mask = '';
            if (chars.indexOf('a') > -1) mask += 'abcdefghijklmnopqrstuvwxyz';
            if (chars.indexOf('A') > -1) mask += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (chars.indexOf('#') > -1) mask += '0123456789';
            var result = '';
            for (var i = length; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];

            return result;
        }

        /*
         Function to get the channelId based on the channelName and the parentId
         */
        function getChannelId(channelName, parentId) {
            var channels = getChannels();
            for (var i = 0; i < channels.length; i++) {
                if (channels[i].name == channelName && channels[i].parent == parentId) {
                    return channels[i].id;
                }
            }
            return false;
        }

        /*
         Function to get the channelParams based on the channelName and the parentId or channelId
         */
        function getChannelParams(channelId, channelName, parentId) {
            var channels = getChannels();
            for (var i = 0; i < channels.length; i++) {
                var channel = channels[i];
                if (channel.id == channelId || (channel.name == channelName && channel.parent == parentId)) {
                    return channel;
                }
            }
            return false;
        }

        /*
         Function return status of new user channel if it is one from array
         */
        function isChannelInArray(channel, array) {
            var result = false;

            for (var i = 0; i < array.length; i++) {
                var id = array[i];
                if (typeof(id) != 'number') {
                    id = parseInt(id);
                }

                if (channel == id) {
                    result = true;
                    break;
                }
            }
            return result;
        }

        /*
         Function return array of all clients connected to server or channel
         */
        function getClients(channelId) {
            var channel, channels, clients = [];
            channels = getChannels();
            if (typeof channelId == 'undefined') {
                for (var i = 0; i < channels.length; i++) {
                    channel = channels[i];
                    for (var i2 = 0; i2 < channel.clients.length; i2++) {
                        clients.push(channel.clients[i2]);
                    }
                }
                return clients;
            } else {
                channel = getChannel(channelId);
                if (isEmpty(channel.clients)) {
                    return false;
                } else {
                    return channel.clients;
                }
            }
            return false;
        }

        /*
         Function return number of users online total or channel based
         */
        function getClientsNumber(channelId) {
            var channel, channels = [];
            var clients = 0;

            channels = getChannels();
            if (typeof channelId == 'undefined') {
                for (var i = 0; i < channels.length; i++) {
                    channel = channels[i];
                    clients += channel.clients.length;
                }
                return clients;
            } else {
                channel = getChannel(channelId);
                if (isEmpty(channel.clients)) {
                    return 0;
                } else {
                    return channel.clients.length;
                }
            }
            return 0;
        }

        /*
         Function get id of channel where specific user is
         */
        function getUserChannelId(clientId) {
            var channel, channels = [];

            channels = getChannels();

            for (var i = 0; i < channels.length; i++) {
                channel = channels[i];
                if (!isEmpty(channel.clients)) {
                    for (var i2 = 0; i2 < channel.clients.length; i2++) {
                        if (channel.clients[i2].id == clientId) {
                            return channel.id;
                        }
                    }
                }
            }

            return 0;
        }

        /*
         Check if object is empty
         */
        function isEmpty(myObject) {
            for (var key in myObject) {
                if (myObject.hasOwnProperty(key)) {
                    return false;
                }
            }
            return true;
        }

        /*
         Function find and replace specific char in string
         */
        function replaceChar(str, find, replace) {
            return str.replace(find, replace);
        }

        /*
         Function replace as many 'sN' variables in string as needed
         */
        function replaceSNVariables(string) {
            for (var i = 1; i < arguments.length; i++) {
                var snI = i - 1;
                var sn = 's' + snI;
                string = replaceChar(string, sn, arguments[i].toString());
            }
            return string;
        }

        /*
         Function remove specific element from array
         */
        function removeFromArray(array, item) {
            var index = array.indexOf(item);
            if (index > -1) {
                array.splice(index, 1);
            }
            return array;
        }

        // -> isUndefined(variable)
        function isUndefined(variable) {
            return typeof variable == "undefined";
        }

    }
);