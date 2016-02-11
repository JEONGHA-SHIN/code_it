/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating JavaScript for robot blocks.
 * @author jstn@cs.washington.edu (Justin Huang)
 */
'use strict';

goog.provide('Blockly.JavaScript.robot');

goog.require('Blockly.JavaScript');

Blockly.JavaScript['robot_display_message_h1h2'] = function(block) {
  var value_h1text = Blockly.JavaScript.valueToCode(block, 'H1TEXT', Blockly.JavaScript.ORDER_COMMA) || '\'\'';
  var value_h2text = Blockly.JavaScript.valueToCode(block, 'H2TEXT', Blockly.JavaScript.ORDER_COMMA) || '\'\'';
  var value_timeout = Blockly.JavaScript.valueToCode(block, 'TIMEOUT', Blockly.JavaScript.ORDER_COMMA) || 0;
  var code = 'robot.displayMessage(' + value_h1text + ', ' + value_h2text + ', ' + value_timeout + ');\n';
  return code;
};


Blockly.JavaScript['robot_display_ask_multiple_choice'] = function(block) {
  var value_question = Blockly.JavaScript.valueToCode(block, 'QUESTION', Blockly.JavaScript.ORDER_ATOMIC);
  var value_choices = Blockly.JavaScript.valueToCode(block, 'CHOICES', Blockly.JavaScript.ORDER_ATOMIC);
  var value_timeout = Blockly.JavaScript.valueToCode(block, 'TIMEOUT', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'robot.askMultipleChoice(' + value_question + ', ' + value_choices + ', ' + value_timeout + ')';
  return [code, Blockly.JavaScript.FUNCTION_CALL];
};

Blockly.JavaScript['robot_movement_go_to'] = function(block) {
  var value_location = Blockly.JavaScript.valueToCode(block, 'LOCATION', Blockly.JavaScript.ORDER_NONE) || '\'\'';
  var code = 'robot.goTo(' + value_location + ')';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['robot_movement_locations'] = function(block) {
  var dropdown_name = block.getFieldValue('NAME');
  var code = Blockly.JavaScript.quote_(dropdown_name);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.JavaScript['robot_movement_go_to_dock'] = function(block) {
  var code = 'robot.goToDock()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['robot_sound_say'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
  var code = 'robot.say(' + value_text + ');\n';
  return code;
};
