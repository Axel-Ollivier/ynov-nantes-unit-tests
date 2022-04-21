<?php

use PHPUnit\Framework\TestCase;

require_once('./src/TempTracker.php');

class TempTrackerTest extends TestCase
{
    public function test_insert()
    {
        $temp_tracker = new TempTracker();
        $temp_tracker->insert(1);
        $this->assertEquals([1], $temp_tracker->get_temps());

    }

    public function test_insert_out_of_range()
    {
        $temp_tracker = new TempTracker();
        $this->expectException(ValueError::class);
        $temp_tracker->insert(210);
    }

    public function test_insert_not_int()
    {
        $temp_tracker = new TempTracker();
        $this->expectException(TypeError::class);
        $temp_tracker->insert('1');
    }

    public function test_get_min()
    {
        $temp_tracker = new TempTracker();
        $temp_tracker->insert(1);
        $temp_tracker->insert(2);
        $temp_tracker->insert(3);
        $this->assertEquals(1, $temp_tracker->get_min());
    }

    public function test_get_min_no_values()
    {
        $temp_tracker = new TempTracker();
        $this->assertEquals(-1, $temp_tracker->get_max());
    }


    public function test_get_max()
    {
        $temp_tracker = new TempTracker();
        $temp_tracker->insert(1);
        $temp_tracker->insert(2);
        $temp_tracker->insert(3);
        $this->assertEquals(3, $temp_tracker->get_max());
    }

    public function test_get_max_no_values()
    {
        $temp_tracker = new TempTracker();
        $this->assertEquals(-1, $temp_tracker->get_max());
    }

    public function test_get_mean()
    {
        $temp_tracker = new TempTracker();
        $temp_tracker->insert(1);
        $temp_tracker->insert(2);
        $temp_tracker->insert(3);
        $this->assertEquals(2, $temp_tracker->get_mean());
    }

    public function test_get_mean_no_values()
    {
        $temp_tracker = new TempTracker();
        $this->assertEquals(-1, $temp_tracker->get_max());
    }
}
