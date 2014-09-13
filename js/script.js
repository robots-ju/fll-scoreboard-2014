/**
 * FLL Scoreboard 2014
 *
 * @author Clark Winkelmann
 *
 */

$(document).ready(function() {
	function calculatePoints() {
		var points = 0;
		
		// Opening Doors
		points += $('input[name=fll-openingdoors]').is(':checked') ? 15 : 0;
		
		// Cloud Access
		points += $('input[name=fll-cloudaccess]').is(':checked') ? 30 : 0;
		
		// Community Learning
		points += $('input[name=fll-communitylearning]').is(':checked') ? 25 : 0;
		
		// Robotics Competition
		var roboticscompetition_val = $('input[name=fll-roboticscompetition]:checked').val();
		points += roboticscompetition_val == 'released' ? 55 : roboticscompetition_val == 'insert' ? 25 : 0;
		
		// Using the Right Senses
		points += $('input[name=fll-rightsenses]').is(':checked') ? 40 : 0;
		
		// Thinking Outside the Box
		var thinkingoutsidebox_val = $('input[name=fll-thinkingoutsidebox]:checked').val();
		points += thinkingoutsidebox_val == 'faceup' ? 40 : thinkingoutsidebox_val == 'facedown' ? 25 : 0;
		
		// Remote Communication / Learning
		points += $('input[name=fll-remotecommunication]').is(':checked') ? 40 : 0;
		
		// Search Engine
		var searchengine_val = $('input[name=fll-searchengine]:checked').val();
		points += searchengine_val == 'removed' ? 60 : searchengine_val == 'pushed' ? 15 : 0;
		
		// Sports
		var sports_val = $('input[name=fll-sports]:checked').val();
		points += sports_val == 'goal' ? 60 : sports_val == 'shoot' ? 30 : 0;
		
		// Reverse Engineering
		var reverseengineering_val = $('input[name=fll-reverseengineering]:checked').val();
		points += reverseengineering_val == 'replicated' ? 45 : reverseengineering_val == 'base' ? 30 : 0;
		
		// Adapting to Changing Conditions
		points += $('input[name=fll-changingconditions]').is(':checked') ? 15 : 0;
		
		// Apprenticeship
		var apprenticeship_val = $('input[name=fll-apprenticeship]:checked').val();
		points += apprenticeship_val == 'circle' ? 35 : apprenticeship_val == 'built' ? 20 : 0;
		
		// Project Based Learning
		var projetlearning_loops = $('input[name=fll-projetlearning-loops]').val();
		var projetlearning_additionalloops = projetlearning_loops > 0 ? projetlearning_loops-1 : 0;
		points += projetlearning_loops > 0 ? 20 : 0; // First loop
		points += projetlearning_additionalloops*10; // Other loops
		
		// Penalty Points
		points -= $('input[name=fll-penaltypoints]').val()*10;
		
		// Engagement
		var engagement_lever = $('input[name=fll-engagement-lever]').is(':checked');
		var engagement_rotations = parseInt($('input[name=fll-engagement-rotations]').val());
		var additional_percent = engagement_lever ? engagement_rotations > 0 ? engagement_rotations+9 : 0 : 0;
		
		$('#totaldetails').html(engagement_lever && engagement_rotations > 0 ? '( '+points+' subtotal + '+additional_percent+'% + 20 )' : '');
		points += (additional_percent/100)*points;
		points += engagement_lever ? 20 : 0; // Lever points added in last place
		
		$('#totalpoints').html(points);
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
