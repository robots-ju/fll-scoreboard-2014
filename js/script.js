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
	function calculatePoints() {
		var points = 0;
		
		// Opening Doors
		var score_openingdoors = $('input[name=fll-openingdoors]').is(':checked') ? 15 : 0;
		points += score_openingdoors;
		$('.mission.openingdoors .score').html(score_openingdoors);
		
		// Cloud Access
		var score_cloudaccess = $('input[name=fll-cloudaccess]').is(':checked') ? 30 : 0;
		points += score_cloudaccess;
		$('.mission.cloudaccess .score').html(score_cloudaccess);
		
		// Community Learning
		var score_communitylearning = $('input[name=fll-communitylearning]').is(':checked') ? 25 : 0;
		points += score_communitylearning;
		$('.mission.communitylearning .score').html(score_communitylearning);
		
		// Robotics Competition
		var roboticscompetition_val = $('input[name=fll-roboticscompetition]:checked').val();
		var score_roboticscompetition = roboticscompetition_val == 'released' ? 55 : roboticscompetition_val == 'insert' ? 25 : 0;
		points += score_roboticscompetition;
		$('.mission.roboticscompetition .score').html(score_roboticscompetition);
		
		// Using the Right Senses
		var score_rightsenses = $('input[name=fll-rightsenses]').is(':checked') ? 40 : 0;
		points += score_rightsenses;
		$('.mission.rightsenses .score').html(score_rightsenses);
		
		// Thinking Outside the Box
		var thinkingoutsidebox_val = $('input[name=fll-thinkingoutsidebox]:checked').val();
		var score_thinkingoutsidebox = thinkingoutsidebox_val == 'faceup' ? 40 : thinkingoutsidebox_val == 'facedown' ? 25 : 0;
		points += score_thinkingoutsidebox;
		$('.mission.thinkingoutsidebox .score').html(score_thinkingoutsidebox);
		
		// Remote Communication / Learning
		var score_remotecommunication = $('input[name=fll-remotecommunication]').is(':checked') ? 40 : 0;
		points += score_remotecommunication;
		$('.mission.remotecommunication .score').html(score_remotecommunication);
		
		// Search Engine
		var searchengine_val = $('input[name=fll-searchengine]:checked').val();
		var score_searchengine = searchengine_val == 'removed' ? 60 : searchengine_val == 'pushed' ? 15 : 0;
		points += score_searchengine;
		$('.mission.searchengine .score').html(score_searchengine);
		
		// Sports
		var sports_val = $('input[name=fll-sports]:checked').val();
		var score_sports = sports_val == 'goal' ? 60 : sports_val == 'shoot' ? 30 : 0;
		points += score_sports;
		$('.mission.sports .score').html(score_sports);
		
		// Reverse Engineering
		var reverseengineering_val = $('input[name=fll-reverseengineering]:checked').val();
		var score_reverseengineering = reverseengineering_val == 'replicated' ? 45 : reverseengineering_val == 'base' ? 30 : 0;
		points += score_reverseengineering;
		$('.mission.reverseengineering .score').html(score_reverseengineering);
		
		// Adapting to Changing Conditions
		var score_changingconditions = $('input[name=fll-changingconditions]').is(':checked') ? 15 : 0;
		points += score_changingconditions;
		$('.mission.changingconditions .score').html(score_changingconditions);
		
		// Apprenticeship
		var apprenticeship_val = $('input[name=fll-apprenticeship]:checked').val();
		var score_apprenticeship = apprenticeship_val == 'circle' ? 35 : apprenticeship_val == 'built' ? 20 : 0;
		points += score_apprenticeship;
		$('.mission.apprenticeship .score').html(score_apprenticeship);
		
		// Project Based Learning
		var projetlearning_loops = $('input[name=fll-projetlearning-loops]').val();
		var projetlearning_additionalloops = projetlearning_loops > 0 ? projetlearning_loops-1 : 0;
		var score_projetlearning = (projetlearning_loops > 0 ? 20 : 0) + // First loop
			projetlearning_additionalloops*10; // Other loops
		points += score_projetlearning;
		$('.mission.projetlearning .score').html(score_projetlearning);
		
		// Penalty Points
		var score_penaltypoints = $('input[name=fll-penaltypoints]').val()*-10;
		points += score_penaltypoints;
		$('.mission.penaltypoints .score').html(score_penaltypoints);
		
		// Engagement
		var engagement_lever = $('input[name=fll-engagement-lever]').is(':checked');
		var engagement_rotations = parseInt($('input[name=fll-engagement-rotations]').val());
		var additional_percent = engagement_lever ? engagement_rotations > 0 ? engagement_rotations+9 : 0 : 0;
		
		$('#totaldetails').html(engagement_lever && engagement_rotations > 0 ? '( '+points+' subtotal + '+additional_percent+'% + 20 )' : '');
		var score_engagementwheel = (additional_percent/100)*points;
		points += score_engagementwheel;
		var score_engagementlever = engagement_lever ? 20 : 0
		points += score_engagementlever; // Lever points added in last place
		$('.mission.engagement .score').html(score_engagementlever+' + '+score_engagementwheel);
		
		$('.totalpoints').html(points);
	}
	
	// On every change
	$('input').change(calculatePoints);
	
	// We do not want to send the form
	$('form').on('submit',function(e) {
		e.preventDefault();
	});
	
	// Reset Button
	$('.reset').click(function() {
		$('form')[0].reset();
		calculatePoints();
	});
	
	// Init
	calculatePoints();
});
