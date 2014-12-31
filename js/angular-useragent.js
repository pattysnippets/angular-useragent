/**
 * Created by Joyce Cam on 30/12/2014.
 *
 * Angularjs Useragent
 *
 */

var useragent = angular.module('useragent', []);

var n = navigator,
	Agent = n.userAgent,
	CodeName = n.appCodeName,
	appVersion = n.appVersion.substr(0, n.appVersion.indexOf(' ')),
	browserName = n.appName,
	platform = n.platform,
	cookie = n.cookieEnabled,
	language = n.language,
	online = n.onLine,
	fullVersion = '' + parseFloat(n.appVersion),
	BrMajorVersion = parseInt(n.appVersion, 10),
	OffsetName, objOffsetVersion, ix,
	OSname = 'unknownUS',
	touch = Modernizr.touch;

// In Chrome
if ((objOffsetVersion = Agent.indexOf("Chrome")) != -1) {
	browserName = "Chrome";
	fullVersion = Agent.substring(objOffsetVersion + 7);
}
// In Microsoft internet explorer
else if ((objOffsetVersion = Agent.indexOf("MSIE")) != -1) {
	browserName = "Microsoft Internet Explorer";
	fullVersion = Agent.substring(objOffsetVersion + 5);
}
// In Firefox
else if ((objOffsetVersion = Agent.indexOf("Firefox")) != -1) {
	browserName = "Firefox";
}
// In Safari
else if ((objOffsetVersion = Agent.indexOf("Safari")) != -1) {
	browserName = "Safari";
	fullVersion = Agent.substring(objOffsetVersion + 7);
	if ((objOffsetVersion = Agent.indexOf("Version")) != -1) fullVersion = Agent.substring(objOffsetVersion + 8);
}
// For other browser "name/version" is at the end of userAgent
else if ((OffsetName = Agent.lastIndexOf(' ') + 1) < (objOffsetVersion = Agent.lastIndexOf('/'))) {
	browserName = Agent.substring(OffsetName, objOffsetVersion);
	fullVersion = Agent.substring(objOffsetVersion + 1);
	if (browserName.toLowerCase() == browserName.toUpperCase()) {
		browserName = navigator.appName;
	}
}
// trimming the fullVersion string at semicolon/space if present
if ((ix = fullVersion.indexOf(";")) != -1) fullVersion = fullVersion.substring(0, ix);
if ((ix = fullVersion.indexOf(" ")) != -1) fullVersion = fullVersion.substring(0, ix);
BrMajorVersion = parseInt('' + fullVersion, 10);
if (isNaN(BrMajorVersion)) {
	fullVersion = '' + parseFloat(navigator.appVersion);
	BrMajorVersion = parseInt(navigator.appVersion, 10);
}

//OS
if (appVersion.indexOf("Win") != -1) {
	OSname = 'windowsOS';
}
if (appVersion.indexOf("Mac") != -1) {
	OSname = 'macOS';
}
if (appVersion.indexOf("X11") != -1) {
	OSname = 'unixOS';
}
if (appVersion.indexOf("Linux") != -1) {
	OSname = 'linuxOS';
}

//Device
var mobile = {
	Android: function () {
		return Agent.match(/Android/i);
	},
	BlackBerry: function () {
		return Agent.match(/BlackBerry/i);
	},
	iOS: function () {
		return Agent.match(/iPhone|iPad|iPod/i);
	},
	Opera: function () {
		return Agent.match(/Opera Mini/i);
	},
	Windows: function () {
		return Agent.match(/IEMobile/i);
	},
	any: function () {
		return (mobile.Android() || mobile.BlackBerry() || mobile.iOS() || mobile.Opera() || mobile.Windows());
	}
};


useragent.factory('useragent', function () {

	return {
		get: function () {
			return Agent;
		},

		appCodeName: function () {
			return CodeName;
		},

		appName: function () {
			return browserName;
		},

		browserName: function () {
			return browserName;
		},

		appVersion: function () {
			return appVersion;
		},

		platform: function () {
			return platform;
		},

		version: function () {
			return BrMajorVersion;
		},

		OS: function () {
			return OSname;
		},

		cookie: function () {
			return cookie;
		},

		lang: function () {
			return language;
		},

		online: function () {
			return online;
		},

		touch: function () {
			return touch;
		},

		device: function () {
			return mobile.any();
		}
	}

})