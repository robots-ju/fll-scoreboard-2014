/**
 * FLL Scoreboard 2014
 *
 * @author Clark Winkelmann
 *
 * This script handles the calculation of the score according to the official
 * FLL documentation at http://www.first-lego-league.org/en/robot-game.html
 *
 * (At least that's what I tried to do, there could still be mistakes or
 * modifications not taken in account, use at your own risks !)
 *
 */

$(document).ready(function() {

	/**
	 * Missions properties
	 * A 'bool' type is boolean that defaults to false
	 * A 'option' type is a string that defaults to 'default'
	 * A 'number' type is an integer that defaults to 0
	 * @type {{name: string, type: string}[]}
	 */
	var missionsDescription = [
		{ name: 'openingdoors',          type: 'bool'},
		{ name: 'cloudaccess',           type: 'bool'},
		{ name: 'communitylearning',     type: 'bool'},
		{ name: 'roboticscompetition',   type: 'option'},
		{ name: 'rightsenses',           type: 'bool'},
		{ name: 'thinkingoutsidethebox', type: 'option'},
		{ name: 'remotecommunication',   type: 'bool'},
		{ name: 'searchengine',          type: 'option'},
		{ name: 'sports',                type: 'option'},
		{ name: 'reverseengineering',    type: 'option'},
		{ name: 'changingconditions',    type: 'bool'},
		{ name: 'apprenticeship',        type: 'option'},
		{ name: 'projectlearning',       type: 'number'},
		{ name: 'penaltypoints',         type: 'number'},
		{ name: 'engagement-lever',      type: 'bool'},
		{ name: 'engagement-rotations',  type: 'number'}
	];

	/**
	 * @param missions Object of missions status
	 * @returns {string} Url hash part
	 */
	function createShareUrl(missions) {
		var i, missionDescription, value;

		var urlParts = [];

		for(i in missionsDescription) {
			missionDescription = missionsDescription[i];

			if(missions[missionDescription.name] != null) {
				value = missions[missionDescription.name];

				if(missionDescription.type == 'bool' && value != false
					|| missionDescription.type == 'option' && value != 'default'
					|| missionDescription.type == 'number' && value != 0) {
					urlParts.push(missionDescription.name + (missionDescription.type == 'bool' ? '' : ':' + value));
				}
			}
		}

		return urlParts.join('|');
	}

	/**
	 * @param url Url hash part
	 * @returns {Object} Object of missions status
	 */
	function parseShareUrl(url) {
		var i, missionDescription, value, j, urlPart, splittedPart;

		var urlParts = url.split('|');

		var missions = {};

		for(i in missionsDescription) {
			missionDescription = missionsDescription[i];

			value = null;

			for(j in urlParts) {
				urlPart = urlParts[j];

				// If the key is present in the url
				if(urlPart.substr(0, missionDescription.name.length) == missionDescription.name) {
					if(missionDescription.type == 'bool') {
						value = true; // Present means true
					} else {
						splittedPart = urlPart.split(':');

						switch(missionDescription.type) {
							case 'option':
								value = splittedPart[1];
								break;
							case 'number':
								value = parseInt(splittedPart[1]);
								break;
						}
					}

					break;
				}
			}

			// If the key was not found in the url
			if(value == null) {
				switch(missionDescription.type) {
					case 'bool':
						value = false;
						break;
					case 'option':
						value = 'default';
						break;
					case 'number':
						value = 0;
						break;
				}
			}

			missions[missionDescription.name] = value;
		}

		return missions;
	}

	/**
	 * Fetches the current status of the ScoreBoard
	 * @returns {Object} Missions status
	 */
	function getCurrentMissionsStatus() {
		var i, missionDescription, value;

		var missions = {};

		for(i in missionsDescription) {
			missionDescription = missionsDescription[i];

			value = '';

			if(missionDescription.type == 'bool') {
				value = $('input[name=fll-' + missionDescription.name + ']').is(':checked');
			} else if(missionDescription.type == 'option') {
				value = $('input[name=fll-' + missionDescription.name + ']:checked').val();
			} else if(missionDescription.type == 'number') {
				value = parseInt($('input[name=fll-' + missionDescription.name + ']').val());
			}

			missions[missionDescription.name] = value;
		}

		return missions;
	}

	/**
	 * Apply the given status to the ScoreBoard
	 * @param missions Missions status
	 */
	function setCurrentMissionStatus(missions) {
		var i, missionDescription, value;

		for(i in missionsDescription) {
			missionDescription = missionsDescription[i];

			value = missions[missionDescription.name];

			if(missionDescription.type == 'bool') {
				value = $('input[name=fll-' + missionDescription.name + ']').prop('checked', value);
			} else if(missionDescription.type == 'option') {
				value = $('input[name=fll-' + missionDescription.name + '][value=' + value + ']').prop('checked', true);
			} else if(missionDescription.type == 'number') {
				value = $('input[name=fll-' + missionDescription.name + ']').val(value);
			}

			missions[missionDescription.name] = value;
		}
	}

	/**
	 * Updates the UI according to current status
	 * @param missions Missions status
	 */
	function calculatePoints(missions) {
		var points = 0;

		// Opening Doors
		var score_openingdoors = missions.openingdoors ? 15 : 0;
		points += score_openingdoors;
		$('.mission.openingdoors .score').html(score_openingdoors);

		// Cloud Access
		var score_cloudaccess = missions.cloudaccess ? 30 : 0;
		points += score_cloudaccess;
		$('.mission.cloudaccess .score').html(score_cloudaccess);

		// Community Learning
		var score_communitylearning = missions.communitylearning ? 25 : 0;
		points += score_communitylearning;
		$('.mission.communitylearning .score').html(score_communitylearning);

		// Robotics Competition
		var score_roboticscompetition = missions.roboticscompetition == 'released' ? 55 : missions.roboticscompetition == 'insert' ? 25 : 0;
		points += score_roboticscompetition;
		$('.mission.roboticscompetition .score').html(score_roboticscompetition);

		// Using the Right Senses
		var score_rightsenses = missions.rightsenses ? 40 : 0;
		points += score_rightsenses;
		$('.mission.rightsenses .score').html(score_rightsenses);

		// Thinking Outside the Box
		var score_thinkingoutsidethebox = missions.thinkingoutsidethebox == 'up' ? 40 : missions.thinkingoutsidethebox == 'down' ? 25 : 0;
		points += score_thinkingoutsidethebox;
		$('.mission.thinkingoutsidethebox .score').html(score_thinkingoutsidethebox);

		// Remote Communication / Learning
		var score_remotecommunication = missions.remotecommunication ? 40 : 0;
		points += score_remotecommunication;
		$('.mission.remotecommunication .score').html(score_remotecommunication);

		// Search Engine
		var score_searchengine = missions.searchengine == 'removed' ? 60 : missions.searchengine == 'pushed' ? 15 : 0;
		points += score_searchengine;
		$('.mission.searchengine .score').html(score_searchengine);

		// Sports
		var score_sports = missions.sports == 'goal' ? 60 : missions.sports == 'shoot' ? 30 : 0;
		points += score_sports;
		$('.mission.sports .score').html(score_sports);

		// Reverse Engineering
		var score_reverseengineering = missions.reverseengineering == 'replicated' ? 45 : missions.reverseengineering == 'base' ? 30 : 0;
		points += score_reverseengineering;
		$('.mission.reverseengineering .score').html(score_reverseengineering);

		// Adapting to Changing Conditions
		var score_changingconditions = missions.changingconditions ? 15 : 0;
		points += score_changingconditions;
		$('.mission.changingconditions .score').html(score_changingconditions);

		// Apprenticeship
		var score_apprenticeship = missions.apprenticeship == 'placed' ? 35 : missions.apprenticeship == 'built' ? 20 : 0;
		points += score_apprenticeship;
		$('.mission.apprenticeship .score').html(score_apprenticeship);

		// Project Based Learning
		var projectlearning_loops = missions['projectlearning'];
		var projectlearning_additionalloops = projectlearning_loops > 0 ? projectlearning_loops-1 : 0;
		var score_projectlearning = (projectlearning_loops > 0 ? 20 : 0) + // First loop
			projectlearning_additionalloops*10; // Other loops
		points += score_projectlearning;
		$('.mission.projectlearning .score').html(score_projectlearning);

		// Penalty Points
		var score_penaltypoints = missions.penaltypoints*-10;
		points += score_penaltypoints;
		$('.mission.penaltypoints .score').html(score_penaltypoints);

		// Engagement
		var engagement_lever = missions['engagement-lever'];
		var engagement_rotations = missions['engagement-rotations'];
		var additional_percent = engagement_lever ? engagement_rotations > 0 ? engagement_rotations+9 : 0 : 0;

		$('#totaldetails').html(engagement_lever && engagement_rotations > 0 ? '( '+points+' subtotal + '+additional_percent+'% + 20 )' : '');
		var score_engagementwheel = (additional_percent/100)*points;
		points += score_engagementwheel;
		var score_engagementlever = engagement_lever ? 20 : 0;
		points += score_engagementlever; // Lever points added in last place
		$('.mission.engagement .score').html(score_engagementlever+' + '+score_engagementwheel);

		$('.totalpoints').html(points);
	}

	/**
	 * Handle a change in the form
	 */
	function handleChange() {
		var missions = getCurrentMissionsStatus();

		calculatePoints(missions);

		var url = createShareUrl(missions);

		if(url == '' && window.history && window.history.pushState) {
			window.history.pushState('', '', window.location.pathname); // Remove the hash completely
		} else {
			location.hash = url;
		}
	}

	/**
	 * Handle the reset of the form
	 */
	function handleReset() {
		$('form').get(0).reset();

		handleChange();
	}

	/**
	 * Handle the initialisation of the page
	 */
	function init() {
		if(location.hash != '' && location.hash != '#') {
			setCurrentMissionStatus(parseShareUrl(location.hash.replace('#', '')));
		}

		handleChange();
	}

	/**
	 * Event bindings
	 */
	$('input').change(handleChange);
	$('.reset').click(handleReset);

	/**
	 * We do not want the form to be sent
	 */
	$('form').on('submit', function(e) {
		e.preventDefault();
	});

	/**
	 * Turn on the lights !
	 */
	init();

});
